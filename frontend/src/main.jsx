import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Version-based storage wipe — bump this string any time to force a clean slate
const APP_VERSION = 'ssis-v2';
if (localStorage.getItem('ssis_app_version') !== APP_VERSION) {
  localStorage.clear();
  localStorage.setItem('ssis_app_version', APP_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
