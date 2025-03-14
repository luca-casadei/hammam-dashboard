#include <Arduino.h>
#include "pins.hpp"
#include "wifi-secrets.hpp"
#include "sensors/TempHumSensor.hpp"
#include "wifi/WifiConnector.hpp"
#include "components/Led.hpp"
#include "mqtt/MQTTManager.hpp"
#include "constants.hpp"

MQTTManager mqttManager(BROKER_NAME, MQTT_PORT, TOPIC_NAME, MQTT_USERNAME, MQTT_PASSWORD);
TempHumSensor *tempHumSensor;
Led *greenLed;

void setup()
{
  Serial.begin(SERIAL_BAUD);

  tempHumSensor = new TempHumSensor(DHT_PIN);
  tempHumSensor->init();

  WifiConnector *wifiConnector = new WifiConnector(AP_NAME, AP_PASSWORD);
  wifiConnector->connect();

  greenLed = new Led(GREEN_LED_PIN);
  greenLed->init();

  mqttManager.begin();
  mqttManager.connect();

  if (mqttManager.isConnected() && wifiConnector->isConnected())
  {
    greenLed->on();
  }

  // Unused outside of setup as its a wrapper.
  delete wifiConnector;
}

unsigned long lastPublishTime = 0;

void loop()
{
  const unsigned long currentTime = millis();
  if ((currentTime - lastPublishTime) > PUBLISH_PERIOD_MILLIS)
  {
    const float detectedTemp = tempHumSensor->getTemperature();
    const float detectedHumidity = tempHumSensor->getHumidity();
    const char * tempMessage = String("TEMPERATURE: " + String(detectedTemp)).c_str();
    const char * humMessage = String("HUMIDITY: " + String(detectedHumidity)).c_str();
    mqttManager.publishMessage(tempMessage);
    mqttManager.publishMessage(humMessage);
    lastPublishTime = currentTime;
  }
  mqttManager.loop();
}