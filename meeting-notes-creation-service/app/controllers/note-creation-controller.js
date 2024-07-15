/**
 * Module for handling CRUD operations related to notes.
 * @module NoteController
 */
import * as noteCreationService from "../services/note-creation-service.js"
import {setResponse, setError} from "./response-handler.js";
import { v4 as uuid } from 'uuid';
import NoteCreation from "../models/note-creation.js";
import {request, response} from "express";

/**
 * Filter MeetingNotes based on provided parameters.
 * @param {Object} filters - The filters for searching MeetingNotes.
 * @returns {Promise<Array>} A promise that resolves to an array of filtered MeetingNotes.
 */

export const search = async (request, response) => {
    try {
        let { id, title, content, actionItems, keywords, startDate, endDate } = request.query;

        // Construct MongoDB query to search for MeetingNotes
        const query = {};

        // Add keyword search if keywords are provided
        if (keywords) {
            query.$or = [
                {id: { $regex: keywords, $options: 'i'}},
                { title: { $regex: keywords, $options: 'i' } },
                { content: { $regex: keywords, $options: 'i' } },
                { actionItems: { $regex: keywords, $options: 'i' } }
            ];
        }

        if (id) {
            query.title = { $regex: id, $options: 'i' };
        }

        // Add title search if title is provided
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        // Add content search if content is provided
        if (content) {
            query.content = { $regex: content, $options: 'i' };
        }

        // Add actionItems search if actionItems are provided
        if (actionItems) {
            query.actionItems = { $in: actionItems };
        }

        // Fetch all MeetingNotes from the database
        const allMeetingNotes = await noteCreationService.search(query);

        // Filter MeetingNotes based on the date range
        const filteredMeetingNotes = allMeetingNotes.filter(note => {
            const noteDate = new Date(note.createdDate);
            if (startDate && endDate) {
                return noteDate >= new Date(startDate) && noteDate <= new Date(endDate);
            } else if (startDate) {
                return noteDate >= new Date(startDate);
            } else if (endDate) {
                return noteDate <= new Date(endDate);
            }
            return true; // Return true if no date range is provided
        });

        // Return the filtered MeetingNotes
        setResponse(filteredMeetingNotes, response);
    } catch (error) {
        setError(error, response);
    }
};


/**
 * Create a new note.
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - A promise resolving to void.
 */

export const post = async (request, response) => {

    try {
        const creation = {...request.body, id:uuid()};
        const noteCreation = await noteCreationService.save(creation);
        setResponse(noteCreation, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Get a note by its ID.
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - A promise resolving to void.
 */
export const get = async (request, response) => {

    try {
        let id = request.params.id;
        const response = {...request.body, id};
        id = response.id;
        console.log(id, typeof id)
        const creation = await noteCreationService.find(id);
        setResponse(creation, response);
        console.log('get request is received.')
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Update a note by its ID.
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - A promise resolving to void.
 */

export const patch = async (request, response) => {
    try {
        const id = request.params.id;
        const updates = {...request.body};
        const updatedNote = await noteCreationService.update(id, updates);
        setResponse(updatedNote, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Delete a note by its ID.
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - A promise resolving to void.
 */
export const del = async (request, response) => {
    try {
        const id = request.params.id;
        console.log(id);
        console.log(typeof id);
        await noteCreationService.remove(id);
        setResponse({message: 'Note deleted successfully'}, response);
    } catch (error) {
        setError(error, response);
    }
}

// export const put = async (request, response) => {
//     try {
//         const id = request.params.id;
//         const newData = { ...request.body }; // Complete representation of the resource
//         // Update the existing note with the new data
//         const updatedNote = await noteCreationService.update(id, newData);
//
//         setResponse(updatedNote, response);
//     } catch (error) {
//         setError(error, response);
//     }
// }





