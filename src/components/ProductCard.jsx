import Quantity from "./QuantityCounter";
import styles from "./ProductCard.module.scss";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart, getCartProducts } from "../sevices/product";

/*{
    id:1,
    title:'...',
    price:'...',
    category:'...',
    description:'...',
    image:'...'
}*/

export const ProductCard = ({item}) => {

    const history = useHistory();
    const [qty, setQty] = useState(0);
    const [carts, setCarts] = useState([]);

    const handleQtyChange = (count) => {
        getCartData();
        setQty(count);
    };

    const handleAddToCart = async () => {
        getCartData();
        addToCart(item, shopIdinCart(), qty);
    }

    const shopIdinCart = () => {
        const it = carts.find((i) => i.id === Number(item.id));
        return it ? it .shopid: null;
    }

    const getCartData = async () => {
        const data = await getCartProducts();
        setCarts(data);
    }

    useEffect(() => {
        getCartData();
    },[]);

    return(
        <div className={styles.PdCard}>
            <img onClick={() => history.push(`/Ecommerce-public/products/${item.id}`)} src={ item.image } alt="item image not found"/>
            <h5>{item.title}</h5>
            <div>
                <div className={styles.PdCard__price}>
                    <h3>${item.price}</h3>
                    <Quantity onChange={handleQtyChange}/>
                </div>
                <div className={styles.purchase}>
                    <button onClick={() => history.push(`/Ecommerce-public/products/${item.id}`)}>Shop now</button>
                    <button onClick={handleAddToCart} className={styles.add}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;