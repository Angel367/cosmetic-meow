import React from "react";
import ProductCard from "../product/ProductCard";
import OrderLine from "./OrderLine";
import {useParams} from "react-router-dom";
import axiosService from "../../requests/axiosService";

const Order = () => {
    const {id_order} = useParams();
    const [order, setOrder] = React.useState(null);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchOrder = async () => {
            const response = await axiosService(`order/${id_order}/`);
            setOrder(response.data);
        }
        fetchOrder();
    }, [id_order]);
    React.useEffect(() => {
        const fetchProducts = async () => {
            const response = await axiosService('product/');
            setProducts(response.data.results);
        }
        fetchProducts();
    }, []);

    if (order === undefined || order === null || products === undefined || products === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <article className={"container mt-5"}>
        <section>
            <h2>Order Information</h2>
            <div className={"orders__container d-flex gap-1"}>
                <p>№{order.id}</p>
                {order.status === "in_progress" ?
                    <p>В процессе</p> :
                    <p>Завершен</p>
                    }
                <p>{order.created_at}</p>
            </div>
        </section>
            <section>
            <h2>Order Items</h2>
            <div className={"orders__container d-flex flex-wrap"}>
                {order.order_items?.map(product => (
                    <ProductCard key={product.id} product={products.find(p => p.id === product.product)}
                                    noButton={true} />
                ))}
            </div>
        </section>


        </article>
    );
}
export default Order;