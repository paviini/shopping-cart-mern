import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import heroImg from "../assets/hero.png";

const sampleProducts = [
  { id: 1, name: "Fresh Apples", description: "Crisp and juicy", price: 120 },
  { id: 2, name: "Organic Carrots", description: "Sweet and crunchy", price: 80 },
  { id: 3, name: "Chocolate Cake", description: "Rich and moist", price: 450 },
];

function Home() {
  const [products] = useState(sampleProducts);

  const addToCart = (p) => {
    // simple placeholder for the CTA — pages using CartContext will overwrite this behavior
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    existing.push(p);
    localStorage.setItem("cart", JSON.stringify(existing));
    alert(`${p.name} added to cart`);
  };

  return (
    <div className="home-page">
      <Navbar />

      <main className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Fresh groceries delivered to your door</h1>
            <p className="lead">
              Buy Fruits, Vegetables, Cakes and Biscuits online — fast delivery, great prices.
            </p>
            <div className="hero-cta">
              <a href="/products" className="btn">Shop Products</a>
              <a href="/register" className="btn ghost">Create Account</a>
            </div>
          </div>

          <div className="hero-media">
            <img src={heroImg} alt="hero" />
          </div>
        </div>
      </main>

      <section className="section categories">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          <div className="card">
            <img src="https://www.google.com/imgres?q=fruits%20pictures%20with%20small%20url&imgurl=https%3A%2F%2Fstatic.vecteezy.
            com%2Fsystem%2Fresources%2Fthumbnails%2F015%2F606%2F657%2Fsmall%2Fcollage-of-fruits-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.
            com%2Ffree-photos%2Ffruit&docid=WddE4LQ7smwaYM&tbnid=NuajqSiumVAlsM&vet=12ahUKEwj6l7OHmv-UAxUhSGwGHXJHBUwQnPAOegQIHRAB.
            .i&w=392&h=350&hcb=2&ved=2ahUKEwj6l7OHmv-UAxUhSGwGHXJHBUwQnPAOegQIHRAB" />
            <h3>Fruits</h3>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=60&auto=format&fit=crop" alt="vegetables" />
            <h3>Vegetables</h3>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=60&auto=format&fit=crop" alt="bakery" />
            <h3>Bakery</h3>
          </div>
        </div>
      </section>

      <section className="section featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;