import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {

  const {
    cart,
    removeFromCart
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div>

      <h1>My Cart</h1>

      {cart.length === 0 && (
        <h3>Cart is Empty</h3>
      )}

      {cart.map(item => (

        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{item.name}</h3>

          <p>Price: Rs. {item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() =>
              removeFromCart(item._id)
            }
          >
            Remove
          </button>

        </div>

      ))}

      <hr />

      <h2>Total: Rs. {totalPrice}</h2>

      <Link to="/checkout">
        <button>
          Proceed to Checkout
        </button>
      </Link>

    </div>
  );
}

export default Cart;