function CartItem({ item, onRemove, onQuantityChange }) {
  const img = item.image || "https://via.placeholder.com/120x90?text=Item";

  return (
    <div className="cart-item">
      <img className="cart-item-media" src={img} alt={item.name} />

      <div className="cart-item-body">
        <h3 className="cart-item-title">{item.name}</h3>
        <p className="cart-item-price">Price: Rs. {item.price}</p>
        <label className="cart-item-qty">
          Quantity
          <input
            type="number"
            min="1"
            step="1"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item._id, e.target.value)}
          />
        </label>
      </div>

      <div className="cart-item-actions">
        <button className="cart-remove" onClick={() => onRemove(item._id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;