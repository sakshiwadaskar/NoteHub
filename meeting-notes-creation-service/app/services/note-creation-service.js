/**
 * Module for handling operations related to course registrations.
 * @module NoteCreationController
 */

import NoteCreation from "../models/note-creation.js";
import {setError, setResponse} from "../controllers/response-handler.js";

/**
 * Search for course registrations based on provided parameters.
 * @async
 * @returns {Promise<Array>} A promise that resolves to an array of course registrations.
 * @param query
 */
// export const search = async (query, selectFields) => {
//     const meetingNotes = await NoteCreation.find(query).select(selectFields).exec();
//     return meetingNotes;
// }

export const search = async (query) => {
    const meetingNotes = await NoteCreation.find(query).exec();
    return meetingNotes;
}



/**
 * Save a new course registration.
 * @async
 * @param {Object} creation - The note creation object to be saved.
 * @returns {Promise<Object>} A promise that resolves to the saved course registration object.
 */
export const save = async (creation) => {
    const noteCreation = new NoteCreation(creation);
    return noteCreation.save();
}

/**
 * Find a course registration by its ID.
 * @async
 * @param {string} id - The ID of the course registration to find.
 * @returns {Promise<Object|null>} A promise that resolves to the found course registration object, or null if not found.
 */
export const find = async (id) => {
    const creation = await NoteCreation.findById(id).exec();
    return creation;
}

/**
 * Update a MeetingNote including action items.
 * @param {string} id - The ID of the MeetingNote to update.
 * @param {Object} updateData - The updated data for the MeetingNote.
 * @returns {Promise<Object>} A promise that resolves to the updated MeetingNote object.
 */
export const update = async (id, updateData) => {
    // Find the MeetingNote by ID and update it with the provided data
    const updatedNote = await NoteCreation.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return updatedNote;
}

/**
 * Delete a MeetingNote.
 * @param {string} id - The ID of the MeetingNote to delete.
 * @returns {Promise<void>} A promise that resolves when the MeetingNote is deleted successfully.
 */
export const remove = async (id) => {
    // Find the MeetingNote by ID and delete it
    await NoteCreation.findByIdAndDelete(id).exec();
}
