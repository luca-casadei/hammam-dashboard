import { TEMPERATURE_TRESHOLDS } from "./tresholds";

export default class TemperatureController{
    public onReceivedTemperature(temperatureReading: number): void{
        if(this.temperatureInSafeRange(temperatureReading)){
            
        }
    }

    private temperatureInSafeRange(temperatureReading: number): boolean{
        return (temperatureReading < TEMPERATURE_TRESHOLDS.max && temperatureReading > TEMPERATURE_TRESHOLDS.min);
    }
}