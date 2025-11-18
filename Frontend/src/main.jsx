



import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserDataProvider } from './context/userContext.jsx'; // ✅ Correct import

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider> {/* ✅ Correct component name */}
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
