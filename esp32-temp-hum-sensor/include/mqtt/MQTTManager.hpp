#pragma once

#include <WiFi.h>
#include <PubSubClient.h>

class MQTTManager
{
public:
    MQTTManager(const char *server, uint16_t port, const char *topic, const char * username, const char * password);
    void begin();
    void connect();
    bool isConnected();
    void loop(void);
    bool publishMessage(const char *msg);
    unsigned int get_frequency();

private:
    static MQTTManager *instance;
    WiFiClient m_espClient;
    PubSubClient m_client;
    uint16_t m_port;
    const char *m_topic;
    const char *m_server;
    const char *password;
    const char *username;
    unsigned int frequency = 1000;
};