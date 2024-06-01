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
  return <div className={"orders"}>
    <h1>Orders</h1>
      <div className={"orders__container"}>
        {orders.map(order => (
          <OrderLine key={order.id} order={order} />
        ))}

        </div>
    </div>;

}
export default Orders;