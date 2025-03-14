package dma.tirocinio.casadei.client;

import io.vertx.core.AbstractVerticle;

/*
 * MQTT Agent
 */
public final class MQTTAgent extends AbstractVerticle {
    private final MQTTClientProvider provider;
    private final String topic;

    public MQTTAgent(final String providerName, final String broker, final int port, final String username, final String password,
                     final String topic) {
        this.provider = new MQTTClientProvider(providerName, broker, port);
        this.provider.connect(username, password);
        this.topic = topic;
    }

    @Override
    public void start() {
        provider.subscribe(topic);
    }
}
