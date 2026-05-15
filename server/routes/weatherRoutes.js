import express from "express";

import {
    createWeather,
    getAllWeather,
    updateWeather,
    deleteWeather
} from "../controllers/weatherController.js";   

const router = express.Router();

router.post("/", createWeather);
router.get("/", getAllWeather);
router.put("/:id", updateWeather);
router.delete("/:id", deleteWeather);

export default router;