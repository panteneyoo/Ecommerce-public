import CartCard from "../components/CartCard";
import { getCartProducts, deleteInCart, updateQty } from "../sevices/product";
import styles from "./Cart.module.scss";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export const Cart = () => {
    const history = useHistory();

    const [carts, setCarts] = useState([]);

    const getCartData = async () => {
        const data = await getCartProducts();
        setCarts(data);
    }
    useEffect(() => {
        getCartData();
    },[])

    const handleDelete = async (id) => {
        await deleteInCart(id);
        getCartData();
    }

    const handleQtyChange = async (id, qty) => {
        await updateQty(id, qty);
        getCartData();
    }

    const totalItems = carts.reduce((acc, cart) => acc + cart.quantity, 0);
    const totalPrice = carts.reduce((acc, cart) => acc + cart.quantity*cart.price, 0);

    return(
        <>
        <div className={styles.header}>
            <div className={styles.header__innerBlock}>Product</div>
            <div className={styles.header__innerBlock}>Name</div>
            <div className={styles.header__innerBlock}>Category</div>
            <div className={styles.header__innerBlock}>Item Price</div>
            <div className={styles.header__innerBlock}>Quantity</div>
            <div className={styles.header__innerBlock}>Total Price</div>
            <div className={styles.header__innerBlock}>Operations</div>
        </div>
        <hr />
        { carts.length !== 0 ? 
            (<div>
                {carts.map((item) => (
                    <CartCard key= {item.shopid} item = {item} onDelete={handleDelete} onChange = {handleQtyChange}/>
                ))}
                <div className={styles.footer}> 
                    <span className={styles.footer__amount}>There are <span className={styles.footer__number}>{totalItems}</span> items in your cart XD</span>
                    <div className={styles.footer__total}><span>Grand Total: </span><span className={styles.footer__number}>${totalPrice.toFixed(2)}</span><button>Checkout</button></div>
                    <div><button onClick={() => history.push(`/Ecommerce-public/products`)} >Back to Home</button></div>
                </div>
            </div>
            )
            :
            (<div className={styles.Empty}>
                <h1>:/ Oops empty cart please add more items :D</h1>
                <div className={styles.footer}>
                    <button onClick={() => history.push(`/Ecommerce-public/products`)} >Back to Home</button>
                </div>
            </div>)
        }
        </>
    )
}

export default Cart;
