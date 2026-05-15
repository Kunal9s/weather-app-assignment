import axios from "axios";

export const getWeatherData = async (city) => {

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return response.data;
};