package dma.tirocinio.casadei.web;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClient;

import java.util.logging.Logger;

public class WebClientVerticle extends AbstractVerticle {
    private final String receiverHost;
    private final int receiverPort;

    public WebClientVerticle(final String receiverHost, final int receiverPort) {
        this.receiverHost = receiverHost;
        this.receiverPort = receiverPort;
    }

    @Override
    public void start() {
        final WebClient client = WebClient.create(vertx);
        //Logging
        final Logger log = Logger.getLogger(this.getClass().getName());
        vertx.eventBus().consumer("temperature.send").handler(message ->
                client.post(receiverPort, receiverHost, "/temperature")
                        .sendJsonObject(
                                new JsonObject()
                                        .put("temperature", message.body().toString())
                                        .put("sender", "HiveMQ")
                        )
                        .onSuccess(_ -> log.info("Sent temperature message to Detector")));
        vertx.eventBus().consumer("humidity.send").handler(message ->
                client.post(receiverPort, receiverHost, "/humidity")
                        .sendJsonObject(
                                new JsonObject()
                                        .put("humidity", message.body().toString())
                                        .put("sender", "HiveMQ")
                        ).onSuccess(_ -> log.info("Sent humidity message to Detector")));
    }
}
