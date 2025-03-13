#include <Arduino.h>
#include "pins.hpp"
#include "wifi-secrets.hpp"
#include "sensors/TempHumSensor.hpp"
#include "wifi/WifiConnector.hpp"
#include "components/Led.hpp"
#include "mqtt/MQTTManager.hpp"
#include "constants.hpp"

MQTTManager mqttManager(BROKER_NAME, MQTT_PORT, TOPIC_NAME);
TempHumSensor *tempHumSensor;
Led *greenLed;

void setup()
{
  Serial.begin(SERIAL_BAUD);

  tempHumSensor = new TempHumSensor(DHT_PIN);
  tempHumSensor->init();

  WifiConnector *wifi_connector = new WifiConnector(AP_NAME, AP_PASSWORD);
  wifi_connector->connect();

  greenLed = new Led(GREEN_LED_PIN);
  greenLed->init();

  mqttManager.begin();
  mqttManager.connect();

  if (wifi_connector->isConnected() && mqttManager.isConnected())
  {
    greenLed->on();
    Serial.println("All services connected");
  }

  // Unused outside of setup as its a wrapper.
  delete wifi_connector;
}

void loop()
{
  mqttManager.loop();
}