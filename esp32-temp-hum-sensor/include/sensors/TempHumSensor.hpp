#pragma once

class DHTesp;
class TempAndHumidity;

class TempHumSensor
{
private:
    DHTesp *dht_sensor;
    unsigned int pin;
    bool initialized;

public:
    TempHumSensor(unsigned int pin);
    ~TempHumSensor();
    void init(void);
    float getTemperature(void);
};
