FROM gradle:jdk23 AS build
WORKDIR /building
COPY . .
RUN gradle shadowJar

FROM eclipse-temurin:23 AS run
WORKDIR /client
COPY --from=build /building/app/build/libs/app-all.jar ./mqtt-client.jar
CMD [ "java", "-jar", "mqtt-client.jar" ]