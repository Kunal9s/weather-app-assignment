import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({

    city: {
        type: String,
        required: true
    },

    temperature: {
        type: Number
    },

    humidity: {
        type: Number
    },

    windSpeed: {
        type: Number
    },

    condition: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;