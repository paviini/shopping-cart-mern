function ProductCard({ product, addToCart }) {
  const img = product.image || "https://via.placeholder.com/320x200?text=Product";

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={img} alt={product.name} />
      </div>

      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-meta">
          <strong className="product-price">Rs. {product.price}</strong>
          <button className="product-add" onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;