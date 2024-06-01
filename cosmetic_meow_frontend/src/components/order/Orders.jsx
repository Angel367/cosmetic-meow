import React from "react";
import OrderLine from "./OrderLine";
import axiosService from "../../requests/axiosService";

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        const fetchOrders = async () => {
            const response = await axiosService('order/');
            setOrders(response.data);
        }
        fetchOrders();
    }, []);
    return (<div className="orders container mt-5">
        <h1 className="mb-4">Orders</h1>
        <div className="orders__container row">
            <div className="col-md-12 mb-3">
                {/*<OrderLine order={{id: 'ID', status: 'Status', updated_at: 'Updated at'}}/>*/}
            </div>
            {orders.map(order => (
                <div key={order.id} className="col-md-12 mb-3">
                    <OrderLine order={order}/>
                </div>
            ))}
        </div>
    </div>);

}
export default Orders;