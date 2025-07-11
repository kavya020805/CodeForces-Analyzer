import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './App.css';

// Add a wrapper to manage body class for theme
function ThemeWrapper() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return <App theme={theme} toggleTheme={toggleTheme} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
); 