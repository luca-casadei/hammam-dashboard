package dma.tirocinio.casadei.service;

import dma.tirocinio.casadei.client.MQTTAgent;
import io.vertx.core.Future;
import io.vertx.core.Vertx;

import java.util.List;
import java.util.logging.Logger;

public final class MQTTServiceDeployer implements ServiceDeployer {
    private final String username;
    private final String password;
    private final String topic;
    private final int port;
    private final String host;

    public MQTTServiceDeployer(final String username, final String password, final String host,
                               final int port, final String topic) {
        this.topic = topic;
        this.username = username;
        this.port = port;
        this.host = host;
        this.password = password;
    }

    @Override
    public void deploy() {
        final Vertx vertx = Vertx.vertx();
        Future.all(
                        List.of(
                                vertx.deployVerticle(new MQTTAgent("TEMPERATURE", host, port, username, password, topic)),
                                vertx.deployVerticle(new MQTTAgent("HUMIDITY", host, port, username, password, topic))
                        )
                ).onFailure(MQTTServiceDeployer::errorFallback)
                .onComplete(_ -> onDeployed());
    }

    private static void onDeployed() {
        final Logger log = Logger.getLogger(MQTTServiceDeployer.class.getName());
        log.fine("Every listener has been deployed.");
    }

    private static void errorFallback(final Throwable err) {
        throw new IllegalStateException(err);
    }
}
