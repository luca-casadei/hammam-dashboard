#include "components/Led.hpp"
#include "Arduino.h"

Led::Led(unsigned int pin)
{
    this->pin = pin;
}

void Led::init(){
    pinMode(this->pin, OUTPUT);
}

void Led::on(void)
{
    digitalWrite(this->pin, HIGH);
}

void Led::off(void)
{
    digitalWrite(this->pin, LOW);
}