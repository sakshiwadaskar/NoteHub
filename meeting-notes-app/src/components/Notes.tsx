import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";
import {Note} from "../models/note.ts";
import axios from "axios";



/**
 * Interface defining the props for the NoteItem component.
 */
interface NoteItemProps {
    /**
     * The note object to render.
     */
    note: Note;
    /**
     * Function to delete a note.
     * @param {any} noteId - The ID of the note to be deleted.
     * @returns {Promise<void>} A Promise that resolves when the note is successfully deleted.
     */
    onDeleteNote: (noteId: any) => Promise<void>;
}

/**
 * Component to render a note with options to expand and collapse,
 * update title and content, manage action items, and delete the note.
 * @param {Note} note - The note object to render.
 * @returns {JSX.Element} Note component.
 */

const Notes: React.FC<NoteItemProps> = ({note, onDeleteNote}) => {

    // State variables

    const [checked, setChecked] = useState<number[]>([0]);
    const [expanded, setExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const [newActionItem, setNewActionItem] = useState('');
    const handleDelete = () => {
        onDeleteNote(note._id);
    };

    const [updatedNote, setUpdatedNote] = useState<Note>({...note}); // State for the updated note


    // Update the updatedNote state when title is changed
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedNote({...updatedNote, title: e.target.value});
    };

    // Update the updatedNote state when truncatedContent is changed
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedNote({...updatedNote, content: e.target.value});
    };

    // Update the updatedNote state when actionItems are changed
    const handleActionItemsChange = (index: number, value: string) => {
        const newActionItems = [...updatedNote.actionItems];
        newActionItems[index] = value;
        setUpdatedNote({...updatedNote, actionItems: newActionItems});
    };

    /**
     * Handles adding a new action item to the note.
     * If the new action item is not empty, it adds it to the list of action items in the updated note.
     * Clears the input field after adding the action item.
     */

    const handleAddActionItem = () => {
        if (newActionItem.trim() !== '') {
            const newActionItems = [...updatedNote.actionItems, newActionItem];
            setUpdatedNote({...updatedNote, actionItems: newActionItems});
            setNewActionItem(''); // Clear the input field after adding action item
        }
    };

    /**
     * Handles toggling the checked state of an action item.
     * @param {number} index - The index of the action item to toggle.
     */

    const handleToggle = (index: number) => () => {
        const currentIndex = checked.indexOf(index);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(index);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    /**
     * Handles updating the note.
     * Sends a PUT request to update the note with the new title, truncated content, and action items.
     * Displays a success or error message based on the response.
     */

    const handleUpdateNote = async () => {
        const updatedNote = {
            ...note,
            title: title, // Update title
            content: content, // Update truncatedContent
            actionItems: actionItems // Update action items
        };

        try {
            // Send a PUT request to update the note
            const response = await axios.patch(`http://localhost:4000/notes/${updatedNote._id}`, updatedNote);

            if (response.status === 200) {
                // Handle success
                console.log("Note updated successfully!");
                setMessage('Note updated successfully!');

            }
        } catch (error) {
            // Handle error
            console.error("Error updating note:", error);
            setMessage('Error updating note!');
        }
    };

    /**
     * Handles closing the notification.
     * Clears the message to close the notification.
     */

    const handleNotificationClose = () => {
        setMessage(''); // Clear the message to close the notification
    };

    /**
     * Handles expanding or collapsing the note.
     * Toggles the expanded state.
     */

    const handleExpand = () => {
        setExpanded(!expanded);
    };


    //the truncated content after maximum of 10 words are followed by "..."
    const truncateContent = (content: string) => {
        const words = content.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        } else {
            return content;
        }
    };


    // Destructuring updatedNote object to extract title, content, and actionItems
    const {title, content, actionItems} = updatedNote;

    /**
     * Renders a single note card with options to expand and collapse,
     * update title and content, manage action items, and delete the note.
     * @returns {JSX.Element} Note card component.
     */
    return (
        <Grid item xs={12} sm={12} padding={5} sx={{color: 'white'}}>
            {/* Render the note card */}
            <Card variant="outlined" style={{
                marginBottom: '20px',
                backgroundColor: 'rebeccapurple',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)'
            }}>
                <CardContent onClick={handleExpand}>
                    {/* Render title and content text fields */}
                    <TextField fullWidth
                               id="outlined-multiline-static"
                               label="Title"
                               variant="filled"
                               value={title}
                               onChange={handleTitleChange} // Update title on change
                    />
                    <TextField fullWidth
                               id="outlined-multiline-static"
                               label="Content"
                               variant="filled"
                               value={expanded ? content : truncateContent(content)}
                               onChange={handleContentChange}
                    />
                </CardContent>
                {/* Render expanded content if expanded state is true */}
                {expanded && (
                    <CardContent>
                        {/* Render action items list */}
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <List>
                                    {/* Map through action items and render each as a text field */}
                                    {actionItems.map((item: string, index: number) => {
                                        const labelId = `checkbox-list-label-${item}`;

                                        return (
                                            <ListItem key={index} sx={{"&:hover": {backgroundColor: 'mediumpurple'}}}>
                                                <ListItemButton
                                                    role={undefined}
                                                    onClick={handleToggle(index)}
                                                    dense

                                                >
                                                    <ListItemIcon>
                                                        {/* Render checkbox for each action item */}
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.includes(index)}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{"aria-labelledby": labelId}}
                                                        />
                                                    </ListItemIcon>

                                                    {/* Render text field for each action item */}
                                                    <TextField
                                                        id={labelId}
                                                        value={item}
                                                        fullWidth
                                                        variant="outlined"
                                                        onChange={(e) => handleActionItemsChange(index, e.target.value)} // Update actionItems on change
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Grid>
                            {/* Render text field to add new action items */}
                            <Grid container direction="row" spacing={2} padding={2}>
                                <Grid alignItems="center" item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={newActionItem}
                                        onChange={(e) => setNewActionItem(e.target.value)}
                                    />
                                </Grid>
                                <Grid padding={3}>
                                    {/* Render button to add new action item */}
                                    <Button
                                        onClick={handleAddActionItem}
                                        variant="outlined"
                                        color="primary">
                                        Add Action Item
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems={"center"}>
                                {/* Render buttons to update and delete the note */}
                                <Button onClick={handleUpdateNote} variant="outlined" color="primary" fullWidth>
                                    Update
                                </Button>
                                <Button onClick={handleDelete} variant="contained" color="secondary" fullWidth>
                                    Delete
                                </Button>
                                {/* Render notification component if message exists */}
                                {/* Display the Notification component */}
                                {message && <Notification message={message} onClose={handleNotificationClose}/>}
                                <TextField fullWidth
                                           id="outlined-multiline-static"
                                           value={note.createdDate}
                                           color={"primary"}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                )}
            </Card>
        </Grid>
    );
};

export default Notes;