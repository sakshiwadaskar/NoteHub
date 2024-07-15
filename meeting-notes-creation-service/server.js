import express from "express";
import dotenv, {config} from 'dotenv';
import initialize from './app/app.js'
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();

// Get port number from environment variables
const port = process.env.PORT;

// Initialize the Express application
initialize(app);


// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));