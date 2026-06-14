import { toast } from "react-toastify";
function ProductCard({ product, addToCart }) {

  const img =
    product.image &&
    product.image.trim() !== ""
      ? product.image
      : "https://via.placeholder.com/320x200?text=Product";

  return (
    <article className="product-card">
      <div className="product-media">
        <img
          src={img}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-meta">
          <strong>Rs. {product.price}</strong>

          <button
            onClick={() => {
              addToCart(product);
              toast.success("✅ Product added successfully!", {
                position: "top-right",
                autoClose: 3000,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;