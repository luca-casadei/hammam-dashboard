#include "sensors/TempHumSensor.hpp"
#include "DHTesp.h"

TempHumSensor::TempHumSensor(unsigned int pin){
    this->pin = pin;
    this->initialized = false;
    this->dht_sensor = new DHTesp();
}

TempHumSensor::~TempHumSensor(){
    delete this->dht_sensor;
}

void TempHumSensor::init(void){
    if (!this->initialized){
        this->dht_sensor->setup(this->pin, DHTesp::AUTO_DETECT);
        this->initialized = true;
    }
}

float TempHumSensor::getTemperature(void){
    return this->dht_sensor->getTemperature();
}