import cors from 'cors'
import express from "express";
import mongoose from 'mongoose';
import initializeRoutes from './routes/index.js';
import models from "./models/index.js";

/**
 * Initializes the Express application.
 * @param {express.Application} app - The Express application instance.
 */
const initialize = (app) => {
    // Enable CORS
    app.use(cors());

    // Parse JSON bodies
    app.use(express.json());

    // Parse URL-encoded bodies
    app.use(express.urlencoded({extended: true}));

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_CONNECTION);

    // Initialize routes
    initializeRoutes(app);
}
export default initialize;