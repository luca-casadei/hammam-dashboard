class WifiConnector
{
private:
    char *ssid;
    char *password;

public:
    void connect(void);
    WifiConnector(const char *ssid, const char *password);
    ~WifiConnector(void);
};