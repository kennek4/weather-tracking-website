import axios from "axios";

const api_key = "dc347ee6628206171268e7bba888013a";

class weatherCall {

    constructor(measurementSystem) {
        this.measurementSystem = measurementSystem;
        this.initialResponse = {};
        this.dataSet = {};
        this.dates = {};
    }

    getCityLongAndLat = async (cityName, returnLimit) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${returnLimit}&appid=${api_key}`;
        const request = axios.get(url);
        const response = await request;
        // console.log(JSON.stringify(response, null, " "));
        // console.log(response.data[0]);
        return {
            latitude: response.data[0].lat,
            longitude: response.data[0].lon,
        }
    };
    getWeatherData = async (cityName, returnLimit) => {
        const coords = await this.getCityLongAndLat(cityName, returnLimit);
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude.toFixed(2)}&lon=${coords.longitude.toFixed(2)}&units=${this.measurementSystem}&appid=${api_key}`;
        const request = axios.get(url);
        const response = await request;

        this.initialResponse = { ...response };
        console.log("Weather data has been retrieved");
    };

    parseData = async () => {
        let count = 0;
        /**
         * iterates through the numbers of the data.list (which contains all of the weather for the 5 day forecast)
         * and stores the dates and the times of the weather
         */
        for (const num in this.initialResponse.data.list) {
            const dateWeather = this.initialResponse.data.list[num];
            this.dates[count] = dateWeather.dt_txt;
            count++
        }
        console.log(JSON.stringify(this.dates, null, " "));
    };
}
export default weatherCall;
