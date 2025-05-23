
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import { ErrorProvider } from './contexts/ErrorContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <LoadingProvider> 
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </LoadingProvider>
    </BrowserRouter>
);
