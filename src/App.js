import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './pages/Navbar';
import Product from './pages/Product/Product';
import AddProduct from './pages/Product/AddProduct';

import axios from 'axios';
import Login from './pages/Login';
axios.defaults.baseURL = "http://localhost:8000/api/";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Product} />
            <Route path="/add-products" component={AddProduct} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;