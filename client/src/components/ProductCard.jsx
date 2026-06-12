function ProductCard({ product, addToCart }) {
  let img;

  if (product.name.toLowerCase().includes("apple")) {
    img =
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800";
  } else if (
    product.name.toLowerCase().includes("carrot")
  ) {
    img =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0BdMHZIYI3BijdDsbPrzz29yXbfJfyf_sS4Rfg3kyQ&s=10";
  } else if (
    product.name.toLowerCase().includes("cake")
  ) {
    img =
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800";
  } else {
    img =
      "https://via.placeholder.com/320x200?text=Product";
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={img} alt={product.name} />
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-meta">
          <strong>Rs. {product.price}</strong>

          <button
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;