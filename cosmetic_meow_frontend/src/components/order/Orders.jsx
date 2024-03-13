import React from "react";
import OrderLine from "./OrderLine";

const Orders = () => {

    const orders = [
        {
            id: 1,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123456",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        },
        {
            id: 2,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123457",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        },
        {
            id: 3,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123458",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        },
        {
            id: 4,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123459",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        },
        {
            id: 5,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123460",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        },
        {
            id: 6,
            dateOfLastStatus: "July 20, 2020",
            orderNumber: "123461",
            orderTotal: 100.00,
            status: "Delivered",
            address: "123 Main St, New York, NY 10001"

        }
    ];
  return <div className={"orders"}>
    <h1>Orders</h1>
      <div className={"orders__container"}>
        {orders.map(order => (
          <OrderLine key={order.id} order={order} />
        ))}
          <div className={"orders__container__pagination"}>
              <button>1</button>
                <button>Previous</button>
              now on page 1
                <button>Next</button>
              <button>5</button>

          </div>
        </div>
    </div>;

}
export default Orders;