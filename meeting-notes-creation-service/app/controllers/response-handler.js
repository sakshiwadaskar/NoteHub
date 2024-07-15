/**
 * Module for handling response handling in Express applications.
 * @module response-handler
 */
import {response} from "express";



/**
 * Set response data and status code for successful responses.
 * @param {object} data - The data to be sent in the response.
 * @param {object} response - The response object.
 * @returns {void} - Does not return a value.
 */
export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
}


/**
 * Set error response with appropriate status code and error message.
 * @param {Error} err - The error object.
 * @param {object} response - The response object.
 * @returns {void} - Does not return a value.
 */
export const setError = (err, response) => {
    console.log(err);
    response.status(500);
    response.json({
        error:{
            code: 'Internal Server Error',
            message: 'Error occured while processing the request'
        }
    })
}