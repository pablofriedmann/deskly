import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const initialTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', initialTheme === 'dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);