import React from "react";

const OrderLine = ({ order }) => {
    return (
        <div>
            <p>Order Number: {order.orderNumber}</p>
            <p>Order Total: {order.orderTotal}</p>
            <p>Status: {order.status}</p>
            <p>Date of Last Status: {order.dateOfLastStatus}</p>
            <p>Address: {order.address}</p>
        </div>
    );
}
export default OrderLine;