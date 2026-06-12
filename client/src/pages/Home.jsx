import { useState } from "react";
import ProductCard from "../components/ProductCard";
import heroImg from "../assets/hero.png";

import fruitsImg from "../assets/fruits.jpg";
import vegetablesImg from "../assets/vegetables.jpg";
import bakeryImg from "../assets/bakery.jpg";

const sampleProducts = [
  {
    id: 1,
    name: "Fresh Apples",
    description: "Crisp and juicy",
    price: 120,
    image: fruitsImg,
  },
  {
    id: 2,
    name: "Organic Carrots",
    description: "Sweet and crunchy",
    price: 80,
    image: vegetablesImg,
  },
  {
    id: 3,
    name: "Chocolate Cake",
    description: "Rich and delicious",
    price: 450,
    image: bakeryImg,
  },
];

function Home() {
  const [products] = useState(sampleProducts);

  const addToCart = (p) => {
    const existing =
      JSON.parse(localStorage.getItem("cart")) || [];

    existing.push(p);

    localStorage.setItem(
      "cart",
      JSON.stringify(existing)
    );

    alert(`${p.name} added to cart`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">
              Fresh groceries <br />
              delivered to your <br />
              door
            </h1>

            <p className="lead">
              Buy Fruits, Vegetables, Cakes and
              Biscuits online — fast delivery,
              great prices.
            </p>

            <div className="hero-cta">
              <a
                href="/products"
                className="btn"
              >
                Shop Products
              </a>

              <a
                href="/register"
                className="btn ghost"
              >
                Create Account
              </a>
            </div>
          </div>

          <div className="hero-media">
            <img
              src={heroImg}
              alt="Fresh Groceries"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories">
        <h2>Popular Categories</h2>

        <div className="categories-grid">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80&auto=format&fit=crop"
              alt="Fruits"
            />
            <h3>Fruits</h3>
          </div>

          <div className="card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfoIZCZOkJq4Yg00gVdyXr49xxOJsFjSjABE_SAzOiDQ&s=10://images.unsplash.com/photo-1603399044346-55504d223a21?w=800&q=80&auto=format&fit=crop"
              alt="Vegetables"
            />
            <h3>Vegetables</h3>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80&auto=format&fit=crop"
              alt="Bakery"
            />
            <h3>Bakery</h3>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section featured">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;