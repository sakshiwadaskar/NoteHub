import mongoose from "mongoose";

/**
 * Defines the schema for the NoteCreation model.
 */
const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    actionItems: {
        type: [String],
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: false
    }
});

/**
 * Creates a NoteCreation model based on the noteSchema.
 */
const model = mongoose.model('noteCreation', noteSchema);

export default model;