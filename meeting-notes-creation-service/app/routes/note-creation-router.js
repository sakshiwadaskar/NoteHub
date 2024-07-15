import express from "express"
import * as noteCreationController from "../controllers/note-creation-controller.js"

const router = express.Router();

/**
 * Defines routes for interacting with notes.
 */
router.route('/')
    .get(noteCreationController.search) // GET request to search notes
    .post(noteCreationController.post); // POST request to create a new note



router.route('/:id')
    .get(noteCreationController.get) // GET request to retrieve a specific note by ID
    .delete(noteCreationController.del) // DELETE request to delete a specific note by ID
    .patch(noteCreationController.patch); // PATCH request to update a specific note by ID




export default router;