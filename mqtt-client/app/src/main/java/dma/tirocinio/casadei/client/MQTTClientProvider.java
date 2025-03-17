package dma.tirocinio.casadei.client;

import com.hivemq.client.mqtt.MqttClient;
import com.hivemq.client.mqtt.mqtt5.Mqtt5AsyncClient;
import com.hivemq.client.mqtt.mqtt5.message.publish.Mqtt5Publish;
import io.vertx.core.AbstractVerticle;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.UUID;
import java.util.logging.Logger;

public final class MQTTClientProvider extends AbstractVerticle {
    private final String providerName;
    private final Mqtt5AsyncClient client;
    private final String topic;
    private final String username;
    private final String password;

    public MQTTClientProvider(final String providerName,
                              final String broker,
                              final int port,
                              final String username,
                              final String password,
                              final String topic) {
        this.client = MqttClient.builder()
                .useMqttVersion5()
                .identifier(UUID.randomUUID().toString())
                .serverHost(broker)
                .serverPort(port)
                .buildAsync();
        this.providerName = providerName;
        this.topic = topic;
        this.username = username;
        this.password = password;
    }

    private void connect() {
        this.client.connectWith()
                .simpleAuth()
                .username(username)
                .password(password.getBytes(StandardCharsets.UTF_8))
                .applySimpleAuth()
                .send();
    }

    private void subscribe() {
        client.subscribeWith()
                .topicFilter(this.topic)
                .callback(this::onMessageReceived)
                .send();
    }

    private void onMessageReceived(final Mqtt5Publish message) {
        final String gottenMessage = new String(message.getPayloadAsBytes(), StandardCharsets.UTF_8);
        if (gottenMessage.startsWith(this.providerName)) {
            final String filteredMessage = gottenMessage.substring(gottenMessage.indexOf(':') + 1).trim();
            final double readValue = Double.parseDouble(filteredMessage);
            //Message logging
            final Logger log = Logger.getLogger(this.getClass().getName());
            log.info("[" + providerName + "]: " + readValue);
            //Sending to the bus
            vertx.eventBus().send(providerName.toLowerCase(Locale.ENGLISH)  + ".send",
                    readValue);
        }
    }

    @Override
    public void start(){
        this.connect();
        this.subscribe();
    }
}
