FROM gradle:jdk23 AS build
WORKDIR /building
ENV VERSION="1"
COPY . .
RUN gradle bootJar

FROM eclipse-temurin:23 AS run
WORKDIR /gateway
ENV VERSION="1"
COPY --from=build /building/build/libs/mqtt-client-${VERSION}.jar ./mqtt-client.jar
CMD [ "java", "-jar", "mqtt-client.jar" ]