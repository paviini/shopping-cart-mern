import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function OrderHistory() {

  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {

    const fetchOrders =
      async () => {

        const res =
          await API.get(
            "/orders"
          );

        setOrders(
          res.data
        );
      };

    fetchOrders();

  }, []);

  return (
    <div>

      <h1>
        Order History
      </h1>

      {
        orders.map(order => (

          <div
            key={order._id}
          >
            <p>
              Rs.
              {order.totalPrice}
            </p>
          </div>

        ))
      }

    </div>
  );
}

export default OrderHistory;