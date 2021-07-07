import Quantity from "./QuantityCounter";
import styles from "./CartCard.module.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { updateQty } from "../sevices/product";

export const CartCard = ({item, onDelete, onChange}) => {
    const history = useHistory();
    const [qty, setQty] = useState(item.quantity);

    const handleQtyChange = (count) => {
        onChange(item.shopid, count);
        setQty(count);
        updateQty(item.shopid, count);
    }

    const handleDelete = (event) => {
        onDelete(item.shopid);
    }
    
    const totalprice = qty * item.price;
    return(
        <div className={styles.CartCard}>
            <img onClick={() => history.push(`/products/${item.id}`)} src={item.image} alt="item image not found" />
            <div className={styles.CartCard__innerBlock}><h3>{item.title}</h3></div>
            <div className={styles.CartCard__innerBlock}><h4>{item.category}</h4></div>
            <div className={styles.CartCard__innerBlock}><h5>${item.price}</h5></div>
            <div className={styles.CartCard__innerBlock}><Quantity onChange={handleQtyChange} start={qty} /></div>
            <div className={styles.CartCard__innerBlock}><h5>${totalprice.toFixed(2)}</h5></div>
            <div className={styles.CartCard__innerBlock}>
                <h6 onClick={() => history.push(`/products/${item.id}`)}>View Product</h6>
                <h6 onClick={handleDelete}>Delete Items</h6>
            </div>
        </div>
    )
}

export default CartCard;