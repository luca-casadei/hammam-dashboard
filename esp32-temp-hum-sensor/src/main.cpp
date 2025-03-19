#include <Arduino.h>
#include "pins.hpp"
#include "wifi-secrets.hpp"
#include "sensors/TempHumSensor.hpp"
#include "wifi/WifiConnector.hpp"
#include "components/Led.hpp"
#include "mqtt/MQTTManager.hpp"
#include "constants.hpp"

MQTTManager mqttManager(BROKER_NAME, MQTT_PORT, TOPIC_NAME, MQTT_USERNAME, MQTT_PASSWORD);
WifiConnector * wifiConnector = new WifiConnector(AP_NAME, AP_PASSWORD);
TempHumSensor *tempHumSensor;
Led *greenLed;

void setup()
{
  Serial.begin(SERIAL_BAUD);

  tempHumSensor = new TempHumSensor(DHT_PIN);
  tempHumSensor->init();

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
  if (!mqttManager.isConnected())
  {
    greenLed->off();
    if (!wifiConnector->isConnected()){
      wifiConnector->connect();
    }
    mqttManager.connect();
  }
  else{
    greenLed->on();
  }
  const unsigned long currentTime = millis();
  if ((currentTime - lastPublishTime) > PUBLISH_PERIOD_MILLIS)
  {
    const float detectedTemp = tempHumSensor->getTemperature();
    const float detectedHumidity = tempHumSensor->getHumidity();
    char *tempMessage = (char *)malloc(sizeof(char) * MESSAGE_BUFFER_LEN);
    char *humMessage = (char *)malloc(sizeof(char) * MESSAGE_BUFFER_LEN);
    sprintf(tempMessage, "%s: %0.2f", "TEMPERATURE", detectedTemp);
    sprintf(humMessage, "%s: %0.2f", "HUMIDITY", detectedHumidity);
    mqttManager.publishMessage(tempMessage);
    mqttManager.publishMessage(humMessage);
    Serial.println(tempMessage);
    Serial.println(humMessage);
    free(tempMessage);
    free(humMessage);
    lastPublishTime = currentTime;
  }
  mqttManager.loop();
}