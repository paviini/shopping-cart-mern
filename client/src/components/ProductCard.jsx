function ProductCard({ product, addToCart }) {

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px"
      }}
    >
      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h4>Rs. {product.price}</h4>

      <button
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;