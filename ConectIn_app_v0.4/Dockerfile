# 1) interface React
FROM node:22-alpine AS front
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# 2) backend Java (com a interface dentro do jar)
FROM maven:3.9-eclipse-temurin-21 AS back
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
COPY --from=front /app/src/main/resources/static ./src/main/resources/static
RUN mvn -q clean package -DskipTests

# 3) imagem final
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=back /app/target/conectin-0.2.0.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
CMD ["java", "-jar", "app.jar"]
