import { useState, useEffect } from "react";
import styles from "./QuantityCounter.module.scss";

export const Quantity = ({ onChange, start = 0}) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        onChange(count);
    },[count]);

    const decrement = (e) => {
        if(count === 0){
            return;
        }
        setCount(count - 1);
    }

    const increment = (e) => {
        setCount(count + 1);
    }


    return(
        <>
            <div className={styles.Counter}>
                <span>Qty:</span>
                <span className={styles.wrap}>
                    <button onClick={decrement}>-</button>
                    <span>{count}</span>
                    <button onClick={increment}>+</button>
                </span>
            </div>
        </>
    )
};

export default Quantity;