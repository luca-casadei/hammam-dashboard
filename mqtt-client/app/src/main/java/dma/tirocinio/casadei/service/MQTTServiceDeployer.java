package dma.tirocinio.casadei.service;

import dma.tirocinio.casadei.client.MQTTClientProvider;
import dma.tirocinio.casadei.web.WebClientVerticle;
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
    private final String receiverHost;
    private final int receiverPort;

    public MQTTServiceDeployer(final String username, final String password, final String host,
                               final int port, final String topic, final int receiverPort, final String receiverHost) {
        this.topic = topic;
        this.username = username;
        this.port = port;
        this.host = host;
        this.password = password;
        this.receiverHost = receiverHost;
        this.receiverPort = receiverPort;
    }

    @Override
    public void deploy() {
        final Vertx vertx = Vertx.vertx();
        Future.all(
                        List.of(
                                vertx.deployVerticle(new MQTTClientProvider("TEMPERATURE", host, port, username, password, topic)),
                                vertx.deployVerticle(new MQTTClientProvider("HUMIDITY", host, port, username, password, topic)),
                                vertx.deployVerticle(new WebClientVerticle(receiverHost, receiverPort))
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
