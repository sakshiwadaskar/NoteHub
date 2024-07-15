/**
 * Component for creating and managing notes.
 * This component handles the creation, deletion, and fetching of notes using Axios for HTTP requests.
 */

import {useEffect, useState} from 'react';
import {TextField, Button, List, ListItem, Grid, Typography} from '@mui/material';
import {Note} from '../models/note';
import axios from "axios";
import Notes from "./Notes.tsx";
import Notification from './Notification'; //  Notification component is in a separate file
// @ts-ignore
import * as React from "react";

const CreateNote = () => {
    // State variables for managing note data
    const [actionItem, setActionItem] = useState<string>("");
    const [actionItems, setActionItems] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [notes, setAllNotes] = useState<Note[]>([]);
    const [_id, setId] = useState<string>("");
    const [message, setMessage] = useState('');
    // const [createdDate, setCreatedDate] = useState<string>('');


    // Fetch notes from the server when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Send a GET request to fetch notes from the server
                const response = await axios.get("http://localhost:4000/notes");
                if (response.status === 200) {
                    // Update the state with the fetched notes
                    setAllNotes(response.data); // Assuming response.data is an array of notes
                }
            } catch (error) {
                // Handle error if fetching notes fails
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes(); // Call the fetchNotes function when the component mounts
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts


    // Function to add a note
    const handleAddNote = async () => {

        // Get the current date and time in ISO format
        const currentDate = new Date().toISOString();
        // Set the createdDate state to the current date and time
        // setCreatedDate(currentDate);

        const newNote: Omit<Note, '_id'> = {
            title,
            content,
            actionItems,
            createdDate: currentDate // Set the createdDate for the new note
        }
        // Send a POST request to create a new note
        const response = await axios.post("http://localhost:4000/notes", newNote);
        if (response.status === 200) {

            setAllNotes([...notes, newNote]);
            console.log("Note created successfully!")
            setMessage("Note created successfully!")
            setTitle(""); // Clear title field after adding note
            setContent(""); // Clear content field after adding note
            setActionItems([]); // Clear action items after adding note
            setId("");

        }
    }


    // Function to close the notification message
    const handleNotificationClose = () => {
        setMessage(''); // Clear the message to close the notification
    };


    // Function to delete a note
    const handleDeleteNote = async (noteId: any) => {
        try {
            // Send a DELETE request to delete the note
            await axios.delete(`http://localhost:4000/notes/${noteId}`);
            // Update the state to remove the deleted note
            setAllNotes(notes.filter((note) => note._id !== noteId));
            console.log('Deleted!!')
        } catch (error) {
            // Handle error if note deletion fails
            console.error('Error deleting note:', error);
            setMessage('Error deleting note!');
        }
    };


    /**
     * Handles adding a new action item to the note.
     * Clears the input field after adding the action item.
     */
    const handleAddAction = () => {
        setActionItems([...actionItems, actionItem]);
        setActionItem(""); // Clear the input field after adding action item
    }


    return (
        <Grid container spacing={2} paddingTop={5}
              direction="column"
              alignItems="center"
              style={{minHeight: '100vh'}}
        >
            {/* Header */}
            <Grid item xs={12} sm={12}>
                {/* Displaying header text */}
                <Typography variant="h5" color="Secondary" align="center" alignContent="center" gutterBottom>
                    Start taking your meeting notes 📝
                </Typography>
            </Grid>

            {/* Input for Title */}
            <Grid item xs={12}>
                {/* Text field for entering the title */}
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label=" Enter the title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>

            {/* Input for Content */}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Add content..."
                    multiline
                    rows={6}
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Grid>

            {/* Action Items */}
            <Grid>
                {/* List of action items */}
                <List>
                    {actionItems.map((item: string, index: number) => (
                        <ListItem key={index}>{item}</ListItem>
                    ))}
                </List>
                {/* Input field for adding new action items */}
                <TextField
                    fullWidth
                    onChange={(e) => setActionItem(e.target.value)}
                    id="standard-basic"
                    label="Add an action item!"
                    variant="outlined"
                    value={actionItem}
                />
                {/* Button to add action items */}
                <Button onClick={handleAddAction} variant="contained" color="secondary" fullWidth>
                    Add Action Items
                </Button>
            </Grid>


            <Grid item xs={12} sm={12}>
                {/* Button for creating a new note */}
                <Button onClick={handleAddNote} variant="outlined" color="secondary" fullWidth>
                    Create!
                </Button>
            </Grid>

            <Grid>
                {/* Notification Component */}
                {/* Displaying notification messages */}
                {message && <Notification message={message} onClose={handleNotificationClose}/>}
            </Grid>
            {/* Displaying Notes */}
            <Grid container spacing={1} item xs={12} sm={6}>
                {/* Mapping through the list of notes and displaying each note */}
                {notes.map((note, index) => (
                    <Grid item xs={12} key={index}>
                        {/* Render the Notes component and pass the onDeleteNote function */}
                        <Notes note={note} onDeleteNote={handleDeleteNote}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default CreateNote;
