import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

import { CartContext } from "../context/CartContext";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/products");

        setProducts(res.data);
      } catch (err) {
        setError("Unable to load products right now. Make sure the server is running.");
      } finally {
        setLoading(false);
      }

    };

    fetchProducts();

  }, []);

  return (
    <div>

      <h1>Products</h1>

      {loading && (
        <p className="status-message">Loading products...</p>
      )}

      {!loading && error && (
        <div className="empty-state">
          <h3>Products are unavailable</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Add items from the admin panel or seed the database to populate this page.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;