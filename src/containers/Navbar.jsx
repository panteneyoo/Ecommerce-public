import { useHistory } from "react-router-dom";
import { getCartProducts } from "../sevices/product";
import styles from "./Navbar.module.scss";
import { useState, useEffect } from "react";
export const Navbar = () => {
    const history = useHistory();

    return(
        <div className={styles.navbar}>
            <div>
                <span onClick={() => history.push(`/Ecommerce-public/products`)} className={styles.navbar__logo}>_SHOPOLOGY</span>
            </div>
            <div className={styles.navbarcart}>
                <img src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-19.jpg"/>
                <span onClick={() => history.push(`/Ecommerce-public/cart`)} className={styles.navbar__cart}>My Cart</span>
            </div>
        </div>
    )
}

export default Navbar;