import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProduct, addToCart, getCartProducts } from "../sevices/product";
import Quantity from "../components/QuantityCounter";
import styles from "./ProductInfo.module.scss";

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(undefined);
    const [qty, setQty] = useState(0);
    const [carts, setCarts] = useState([]);
    const history = useHistory();

    const handleQtyChange = (count) => {
        getCartData();
        setQty(count);
    };

    const handleAddToCart = async () => {
        getCartData();
        addToCart(product, shopIdinCart(), qty);
    }

    const shopIdinCart = () => {
        const item = carts.find((item) => item.id === Number(id));
        return item? item.shopid: null;
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getProduct(id);
            setProduct(data);
        }

        getData();
    },[]);

    const getCartData = async () => {
        const data = await getCartProducts();
        setCarts(data);
    }

    useEffect(() => {
        getCartData();
    },[]);

    return(
        <>
            { product ? (
                <>
                <div className={styles.product}>
                    <img src={product.image} alt="item image not found"/>
                    <div className={styles.product__nonimage}>
                        <h3>{product.title}</h3>
                        <h2>${product.price}</h2>
                        <h5>Category: {product.category}</h5>
                        <p>{product.description}</p>
                        <div className={styles.product__nonimage__purchase}>
                            <Quantity onChange={handleQtyChange}/>
                            <button onClick={handleAddToCart} className={styles.add}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <button className={styles.back} onClick={() => history.push(`/Ecommerce-public/products`)} >Back to Home</button>
                </>
            ):(
                <div className={styles.notfound}><p>Items not found</p>
                <button onClick={() => history.push(`/Ecommerce-public/products`)} >Back to Home</button></div>
            )}
        </>
    );
};

export default ProductInfo;