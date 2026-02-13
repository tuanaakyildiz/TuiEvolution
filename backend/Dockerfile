# Java 25 destekleyen bir temel imaj kullanıyoruz
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Maven'ı manuel olarak kuruyoruz
RUN apt-get update && apt-get install -y maven

COPY . .
RUN mvn clean package -DskipTests

# Çalıştırma aşaması
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]