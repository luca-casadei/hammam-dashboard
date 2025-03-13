#pragma once

#include <WiFi.h>
#include <PubSubClient.h>

class MQTTManager
{
public:
    MQTTManager(const char *server, uint16_t port, const char *topic);

    void begin();

    void connect();

    bool isConnected();

    void loop(void);

    void publishMessage(const char *msg);

    unsigned int get_frequency();

private:
    static MQTTManager *instance;
    WiFiClient m_espClient;
    PubSubClient m_client;
    uint16_t m_port;
    const char *m_topic;
    const char *m_server;
    unsigned int frequency = 1000;
};