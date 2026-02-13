FROM maven:3.9.4-eclipse-temurin-25 AS build
# Root Directory backend olarak seçildiği için nokta (.) artık backend klasörünü temsil eder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
# target klasörünün doğru kopyalandığından emin oluyoruz
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]