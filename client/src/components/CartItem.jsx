function CartItem({ item }) {
  return (
    <div>
      <h3>{item.name}</h3>

      <p>Price: Rs. {item.price}</p>

      <p>Quantity: {item.quantity}</p>

      <button>Remove</button>
    </div>
  );
}

export default CartItem;