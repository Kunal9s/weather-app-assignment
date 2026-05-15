import express from "express";

import {
    createWeather,
    getAllWeather,
    updateWeather,
    deleteWeather,
    getForecast
} from "../controllers/weatherController.js";   

const router = express.Router();

router.post("/", createWeather);
router.post("/forecast", getForecast);
router.get("/", getAllWeather);
router.put("/:id", updateWeather);
router.delete("/:id", deleteWeather);

export default router;