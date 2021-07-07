import ProductCard from "../components/ProductCard";
import { getProducts } from "../sevices/product";
import { useState, useEffect } from "react";
import styles from "./Product.module.scss";
import Carousel from "react-elastic-carousel";
import CarouselCard from "../components/CarouselCard";

export const Product = () => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        getData();
    },[]);

    const breakPoints = [
        { width: 1, itemsToShow: 1},
        { width: 550, itemsToShow: 2},
        { width: 768, itemsToShow: 3},
        { width: 1200, itemsToShow: 4}
    ]

    const breakPoint2 = [
        { width: 1, itemsToShow: 1},
        { width: 550, itemsToShow: 2},
        { width: 768, itemsToShow: 3},
        { width: 1200, itemsToShow: 4}
    ]

    const categories = new Set(products.map((product) => product.category));
    const category = [...categories];

    const CategoryCasourel = category.map((i) => {
        return [ i ,products.filter((product) => product.category === i)]; 
    });

    return(
        <>
            <h1 className={styles.sectionTitle}>New Arrivals{">"}</h1>
            <div className={styles.Carousel}>
                <Carousel breakPoints={breakPoints}> 
                    {products.map((item) => (
                    <CarouselCard key= {item.id} item = {item}/>
                    ))}
                </Carousel>
            
            </div>
            <h1  className={styles.sectionTitle}>Shop All{">"}</h1>
            <div className={styles.productgrid}>
                {products.map((item) => (
                    <ProductCard key= {item.id} item = {item}/>
                ))}
            </div>
            <h1  className={styles.sectionTitle}>Shop by Categories{">"}</h1>
                {CategoryCasourel.map((ctgr) => (
                    <div>
                        <h3 className={styles.categoryTitle}>{ctgr[0].toUpperCase()}{">"}</h3>
                        <div className={styles.CategoryCarousel}>
                            <Carousel breakPoints={breakPoints}> 
                                {ctgr[1].map((item) => (
                                <CarouselCard key= {item.id} item = {item}/>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default Product;