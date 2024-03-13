import React from "react";
import ProductCard from "../baseComponents/ProductCard";

const Order = ({ order }) => {
    if (!order) {
        order = {
            id: 1,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123456",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001",
            orderProducts: [
                {
                    id: 1,
                    name: "Product 1",
                    price: 10.00,
                    quantity: 2
                },
                {
                    id: 2,
                    name: "Product 2",
                    price: 20.00,
                    quantity: 3
                },
                {
                    id: 3,
                    name: "Product 3",
                    price: 30.00,
                    quantity: 4
                }
            ]
        }
    }
    return (
        <article>
        <section>
            <h2>Order Details</h2>
                <div className={"orders__container"}>
                    {order.map(order => (
                        <ProductCard product={order} noButton={true} isOrder={true} />
                    ))}
                </div>
        </section>

        <section>
            <p>Order Number: {order.orderNumber}</p>
            <p>Order Total: {order.orderTotal}</p>
            <p>Status: {order.status}</p>
            <p>Date of Last Status: {order.dateOfLastStatus}</p>
            <p>Address: {order.address}</p>
        </section>
        </article>
    );
}
export default Order;