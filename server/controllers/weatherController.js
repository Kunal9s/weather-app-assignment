import Weather from "../models/Weather.js";
import { getWeatherData } from "../services/weatherService.js";

export const createWeather = async (req, res) => {

    try {

        const { city } = req.body;

        if(!city) {
            return res.status(400).json({
                message: "City is required"
            });
        }

        const weatherData = await getWeatherData(city);

        const newWeather = await Weather.create({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            condition: weatherData.weather[0].main
        });

        res.status(201).json(newWeather);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllWeather = async(req, res) => {

    try {

        const weather = await Weather.find();

        res.status(200).json(weather);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const updateWeather = async(req, res) => {

    try {

        const updateWeather = await Weather.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updateWeather);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteWeather = async(req, res) => {

    try {

        await Weather.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Weather deleted successfully"
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
};