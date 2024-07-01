import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App.jsx';
import './index.css';
import CartProvider from './components/Cart/CartContex';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
