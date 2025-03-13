#include "./mqtt/MQTTManager.hpp"
#include "constants.hpp"

MQTTManager *MQTTManager::instance = nullptr;

MQTTManager::MQTTManager(const char *server, uint16_t port, const char *topic)
    : m_client(m_espClient), m_server(server), m_port(port), m_topic(topic)
{
    if (instance == nullptr)
    {
        instance = this;
    }
}

unsigned int MQTTManager::get_frequency()
{
    return this->frequency;
}

void MQTTManager::begin()
{
    Serial.println(m_server);
    m_client.setServer(m_server, m_port);
}

void MQTTManager::connect()
{
    if (!m_client.connected())
    {
        while (!m_client.connected())
        {
            String clientId = String(MQTT_CLIENT_ID) + String(random(0xffff), HEX);
            if (m_client.connect(clientId.c_str()))
            {
                Serial.println("MQTT Connected");
                m_client.subscribe(m_topic);
            }
            else
            {
                Serial.print("failed, rc=");
                Serial.print(m_client.state());
                Serial.println(" - trying again in 5 seconds");
                delay(5000);
            }
        }
    }
    m_client.loop();
}

bool MQTTManager::isConnected()
{
    return m_client.connected();
}

void MQTTManager::loop(void)
{
    this->m_client.loop();
}

void MQTTManager::publishMessage(const char *msg)
{
    m_client.publish(m_topic, msg);
}