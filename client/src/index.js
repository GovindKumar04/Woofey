import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes/Routes'; // Ensure this is the correct path
import { Provider } from 'react-redux';
import store from './components/app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>
);

reportWebVitals();
