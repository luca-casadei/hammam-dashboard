package dma.tirocinio.casadei;

import dma.tirocinio.casadei.service.MQTTServiceDeployer;

public final class MqttConsumer {
    private static final String BROKER_HOST = "mqtt-broker";
    private static final int PORT = 1883;
    private static final String USERNAME = "reader";
    private static final String PASSWORD = "anacardo";
    private static final String TOPIC = "dma-mqttsharing-casadei";

    private MqttConsumer() {
    }

    public static void main(final String[] args) {
        final MQTTServiceDeployer deployer = new MQTTServiceDeployer(USERNAME, PASSWORD, BROKER_HOST, PORT, TOPIC);
        deployer.deploy();
    }
}
