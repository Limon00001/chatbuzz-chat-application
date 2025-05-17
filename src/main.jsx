/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 17 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */
// External imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Internal imports
import App from './App.jsx';

// Importing global CSS
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
