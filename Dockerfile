FROM eclipse-temurin:17 AS prod-build

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
COPY application.yml ./application.yml

RUN ./mvnw package


FROM eclipse-temurin:17 AS prod
WORKDIR /app
COPY --from=prod-build /app/target/spring-starter-0.0.1-SNAPSHOT.jar .
COPY --from=prod-build /app/application.yml .

CMD ["java", "-jar", "spring-starter-0.0.1-SNAPSHOT.jar"]
