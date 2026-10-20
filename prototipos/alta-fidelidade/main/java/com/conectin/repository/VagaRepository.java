package com.conectin.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.conectin.model.VagaResumo;

/** Acesso às tabelas vaga e vaga_area. Só executa SQL; as regras de negócio ficam no service. */
@Repository
public class VagaRepository {

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert insertVaga;

    public VagaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.insertVaga = new SimpleJdbcInsert(jdbc)
                .withTableName("vaga")
                .usingGeneratedKeyColumns("id_vaga");
    }

    public boolean empregadorExiste(int idEmpregador) {
        Integer total = jdbc.queryForObject(
                "SELECT COUNT(*) FROM empregador WHERE id_usuario = ?", Integer.class, idEmpregador);
        return total != null && total > 0;
    }

    /** Grava a vaga (status "aberta" e data de publicação vêm do padrão do banco) e devolve o id gerado. */
    public int inserirVaga(int idEmpregador, String titulo, String descricao, String requisitos,
                           String tipo, String modalidade, LocalDate prazoInscricao) {
        Map<String, Object> colunas = new HashMap<>();
        colunas.put("id_empregador", idEmpregador);
        colunas.put("titulo", titulo);
        colunas.put("descricao", descricao);
        colunas.put("requisitos", requisitos);
        colunas.put("tipo", tipo);
        colunas.put("modalidade", modalidade);
        colunas.put("prazo_inscricao", java.sql.Date.valueOf(prazoInscricao));
        return insertVaga.executeAndReturnKey(colunas).intValue();
    }

    public void ligarArea(int idVaga, int idArea) {
        jdbc.update("INSERT INTO vaga_area (id_vaga, id_area) VALUES (?, ?)", idVaga, idArea);
    }

    /**
     * Lista só as vagas abertas, da mais recente para a mais antiga.
     * Os filtros são opcionais (null = sem filtro). O filtro por área mostra a vaga com todas as suas áreas.
     */
    public List<VagaResumo> listarAbertas(String tipo, String modalidade, Integer idArea) {
        StringBuilder sql = new StringBuilder("""
                SELECT v.id_vaga, v.titulo, v.descricao, v.requisitos, v.tipo, v.modalidade,
                       v.prazo_inscricao, e.razao_social AS empresa,
                       GROUP_CONCAT(a.nome ORDER BY a.nome SEPARATOR '|') AS areas
                FROM vaga v
                JOIN empregador e ON e.id_usuario = v.id_empregador
                LEFT JOIN vaga_area va ON va.id_vaga = v.id_vaga
                LEFT JOIN area_atuacao a ON a.id_area = va.id_area
                WHERE v.status = 'aberta'
                """);
        List<Object> argumentos = new ArrayList<>();

        if (tipo != null) {
            sql.append(" AND v.tipo = ?");
            argumentos.add(tipo);
        }
        if (modalidade != null) {
            sql.append(" AND v.modalidade = ?");
            argumentos.add(modalidade);
        }
        if (idArea != null) {
            sql.append(" AND v.id_vaga IN (SELECT id_vaga FROM vaga_area WHERE id_area = ?)");
            argumentos.add(idArea);
        }
        sql.append(" GROUP BY v.id_vaga, e.razao_social");
        sql.append(" ORDER BY v.data_publicacao DESC, v.id_vaga DESC");

        return jdbc.query(sql.toString(), (rs, n) -> new VagaResumo(
                rs.getInt("id_vaga"),
                rs.getString("titulo"),
                rs.getString("descricao"),
                rs.getString("requisitos"),
                rs.getString("tipo"),
                rs.getString("modalidade"),
                rs.getDate("prazo_inscricao").toLocalDate(),
                rs.getString("empresa"),
                separarAreas(rs.getString("areas"))), argumentos.toArray());
    }

    private static List<String> separarAreas(String areasConcatenadas) {
        if (areasConcatenadas == null || areasConcatenadas.isBlank()) {
            return List.of();
        }
        return Arrays.asList(areasConcatenadas.split("\\|"));
    }
}
