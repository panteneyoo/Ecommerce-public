import './App.css';
import Product from "./containers/Product";
import Cart from "./containers/Cart";
import React from "react";
import { useHistory, BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import ProductInfo from "./containers/ProductInfo";
import Navbar from "./containers/Navbar";
import styles from "./App.module.scss";

const App = () => {
  const history = useHistory();

  return (
      <Router>
          <Navbar />
          <Switch>
            <Route exact path="/Ecommerce-public">
                <Redirect to="/Ecommerce-public/products" />
            </Route>
            <Route exact path="/Ecommerce-public/products">
              <Product />
            </Route>
            <Route path="/Ecommerce-public/products/:id">
              <ProductInfo />
            </Route>
            <Route path="/Ecommerce-public/cart">
              <Cart />
            </Route>
          </Switch>
          <footer className={styles.footer}>
            <hr/>
            Copyright &copy; 2021 Tingyu Pan
          </footer>
      </Router>
  );
}

export default App;
