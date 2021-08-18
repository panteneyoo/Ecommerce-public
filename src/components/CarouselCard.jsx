import styles from "./CarouselCard.module.scss";
import { useHistory } from "react-router-dom";

export const CarouselCard = ({item}) => {

    const history = useHistory();

    return(
        <div className={styles.CarouselCard}>
            <img onClick={() => history.push(`/Ecommerce-public/products/${item.id}`)} src={ item.image } alt="item image not found"/>
            <div className={styles.CarouselCard__tag}>
                <h4>{item.title}</h4>
                <h3>${item.price}</h3>
            </div>
        </div>
    )
}

export default CarouselCard;