import { useState } from 'react'

import Header from "./components/Header.tsx";
import CreateNote from "./components/CreateNote.tsx";


/**
 * The main application component.
 * Renders the Header and CreateNote components.
 */

function App() {

    return (
        <>
            {/* Renders the Header component */}
            <Header/>
             Renders the CreateNote component
            <CreateNote/>

        </>

    )
}

export default App
