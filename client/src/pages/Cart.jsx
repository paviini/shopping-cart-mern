import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {

  const {
    cart,
    removeFromCart,
    updateCartQuantity
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page"><br></br>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>
            Looks like you haven't added anything yet. <Link to="/products">Shop products</Link> to get started.
          </p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-list">
            {cart.map(item => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={updateCartQuantity}
              />
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p className="summary-line"><strong>Items:</strong> {cart.length}</p>
            <p className="summary-line"><strong>Total:</strong> Rs. {totalPrice}</p>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </aside>
        </div>
      )}

    </div>
  );
}

export default Cart;