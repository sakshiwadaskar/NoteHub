/**
 * Initializes routes for the application.
 * @module routes/initializeRoutes
 * @param {Object} app - The Express application instance.
 */


import noteCreationRouter from "./note-creation-router.js";

/**
 * Initializes routes for the application.
 * @param {Object} app - The Express application instance.
 */

const initializeRoutes = (app) => {
    app.use('/notes', noteCreationRouter);
}

export default initializeRoutes;