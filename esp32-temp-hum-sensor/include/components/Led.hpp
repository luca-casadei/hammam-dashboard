class Led
{
private:
    unsigned int pin;

public:
    Led(unsigned int pin);
    void on(void);
    void off(void);
    void init(void);
};