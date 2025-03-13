#include <Arduino.h>
#include "pins.hpp"
#include "wifi-secrets.hpp"
#include "sensors/TempHumSensor.hpp"
#include "wifi/WifiConnector.hpp"

TempHumSensor *tempHumSensor;

void setup()
{
  Serial.begin(SERIAL_BAUD);
  tempHumSensor = new TempHumSensor(DHT_PIN);
  tempHumSensor->init();
  WifiConnector *connector = new WifiConnector(AP_NAME, AP_PASSWORD);
  connector->connect();
  delete connector;
  Serial.println("Connected to wifi");
}

void loop()
{
}