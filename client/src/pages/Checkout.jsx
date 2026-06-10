import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function Checkout() {

  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {

    try {

      await API.post(
        "/orders",
        {
          orderItems: cart,
          totalPrice: total,
        }
      );

      alert(
        "Order Placed Successfully"
      );

    } catch (error) {

      alert(
        "Failed to Place Order"
      );

      console.log(error);
    }
  };

  return (
    <div>

      <h1>Checkout</h1>

      <h3>Total: Rs. {total}</h3>

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>
  );
}

export default Checkout;