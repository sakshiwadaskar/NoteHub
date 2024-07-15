/**
 * Represents the structure of a note object.
 */

export interface Note {
    _id?: string;          // Optional property for the unique identifier of the note
    title: string;         // Title of the note
    content: string;       // Content or description of the note
    actionItems: string[]  // Array of action items associated with the note
    createdDate?: string;         // Optional property for the date of the note creation
}