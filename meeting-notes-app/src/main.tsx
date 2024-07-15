import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


/**
 * Entry point of the application.
 * Renders the root component within the React.StrictMode.
 * @remarks
 * ReactDOM.createRoot is used to render the root component into the DOM.
 * @param {HTMLElement} rootElement - The root HTML element where the application will be rendered.
 * @returns {void}
 */

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
