#include "wifi/WifiConnector.hpp"
#include "WiFi.h"

void WifiConnector::connect()
{
    delay(10);
    Serial.println(String("Connecting to ") + this->ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(this->ssid, this->password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

WifiConnector::WifiConnector(const char *ssid, const char *password)
{
    this->password = strdup(password);
    this->ssid = strdup(ssid);
}

WifiConnector::~WifiConnector(){
    free(this->password);
    free(this->ssid);
}