[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UCQYxFhy)
# Assignment *: Node.js/Express REST API README

## Overview

This project aims to develop a simple Node.js/Express REST API to manage MeetingNotes. It fulfills specific user requirements and adheres to technical specifications as outlined below.

## User Requirements

1. **Fetch MeetingNotes**:
    - As a developer, I should be able to fetch all existing meetings using the MeetingNotes Resource.

2. **Filter MeetingNotes**:
    - As a developer, I should be able to filter all existing MeetingNotes using keywords in the title or content or in the action items, and MeetingNote between a create date range.

3. **Add MeetingNote**:
    - As a developer, I should be able to add a MeetingNote using the MeetingNotes Resource.

4. **Update MeetingNote**:
    - As a developer, I should be able to update a MeetingNote including the action items using the MeetingNotes Resource.

5. **Delete MeetingNote**:
    - As a developer, I should be able to delete a MeetingNote using the MeetingNotes Resource.

## Technical Requirements

This assignment focuses on learning key technologies and concepts such as Node.js, Express.js, Mongoose, and building REST APIs efficiently. Here's how these requirements are addressed:

1. **Express Framework**:
    - Utilize the Express framework for developing the endpoints, providing a streamlined approach to route handling and middleware management.

2. **MongoDB**:
    - Employ MongoDB as the persistence layer to store MeetingNote objects, leveraging its scalability and flexibility for data storage.

3. **MeetingNote Object**:
    - Define a MeetingNote object with the following properties:
        - id: Unique identifier for each MeetingNote.
        - title: Title of the MeetingNote.
        - content: Content of the MeetingNote.
        - action items: List of action items associated with the MeetingNote.
        - createdDate: Timestamp indicating the creation date of the MeetingNote.

4. **Nodemon**:
    - Use Nodemon to automatically restart the server when changes are detected in the source code. This facilitates a smoother development experience by eliminating the need to manually stop and restart the server after each modification.

## Setup Instructions

To set up and run the Node.js/Express REST API for managing MeetingNotes, follow these steps:

1. **Clone Repository**:
    - Clone this repository to your local machine using Git:
    ```
    git clone <repository_url>
    ```

2. **Install Dependencies**:
    - Navigate to the project directory and install dependencies using npm:
    ```
    cd <project_directory>
    npm install
    ```

3. **Configure MongoDB**:
    - Ensure MongoDB is installed and running on your machine or configure connection settings appropriately in the project.

4. **Run the Application**:
    - Start the Node.js server by running:
    ```
    npm start
    ```

   Alternatively, if you have Nodemon installed globally, you can use:
    ```
    nodemon index.js
    ```

5. **Testing Endpoints**:
    - Use tools like Postman or curl to test the implemented endpoints based on the provided user requirements.

## API Endpoints

### MeetingNotes Resource

- **GET /notes**:
    - Retrieve all existing MeetingNotes.

- **GET /notes?keyword={keyword}&fromDate={fromDate}&toDate={toDate}**:
    - Filter MeetingNotes based on keywords in title or content and within a specified date range.

- **POST /notes**:
    - Add a new MeetingNote.

- **PUT /notes/{id}**:
    - Update an existing MeetingNote identified by its ID.

- **PATCH /notes/{id}**:
    - Partially update an existing MeetingNote identified by its ID.

- **DELETE /notes/{id}**:
    - Delete a MeetingNote identified by its ID.

## Conclusion

This README provides an overview of the Node.js/Express REST API developed for Assignment 6. By following the setup instructions and utilizing the provided API endpoints, developers can effectively manage MeetingNotes while gaining valuable experience with key technologies and best practices in building RESTful APIs, aided by the automatic server restart functionality of Nodemon.