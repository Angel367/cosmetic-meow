import React from "react";
import {Link} from "react-router-dom";

const OrderLine = ({ order }) => {
    let status = order.status;
    if (order.status === 'in_progress') {
        status = 'В обработке'
    }
    if (order.status === 'done') {
        status = 'Завершен'
    }
    return (
        <div className={'d-flex justify-content-between align-items-center'}>
            <p>{order.id}</p>
            <p>{status}</p>
            <p>{order.updated_at}</p>
            <Link to={`${order.id}`} className="btn btn-primary">Подробнее</Link>
        </div>
    );
}
export default OrderLine;