import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/Pages/App';
import '../src/assets/index.css';
import { AuthProvider } from '../src/Components/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);