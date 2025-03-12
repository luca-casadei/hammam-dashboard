FROM gradle:jdk23 AS build
WORKDIR /building
COPY . .
RUN gradle build

FROM eclipse-temurin:23 AS run
WORKDIR /client
COPY --from=build /building/app/build/libs/app.jar ./amqp-client.jar
CMD [ "java", "-jar", "amqp-client.jar" ]