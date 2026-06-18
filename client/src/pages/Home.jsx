import heroImg from "../assets/hero.png";

import fruitsImg from "../assets/fruits.jpg";
import vegetablesImg from "../assets/vegetables.jpg";
import bakeryImg from "../assets/bakery.jpg";

function Home() {
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
              <a href="/products" className="btn">
                Shop Products
              </a>

              <a href="/register" className="btn ghost">
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

      {/* Why Choose Us */}
      <section className="section features">
        <h2>Why Choose Our Store?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🚚 Fast Delivery</h3>
            <p>
              Get your groceries delivered
              quickly and safely to your
              doorstep.
            </p>
          </div>

          <div className="feature-card">
            <h3>🥕 Fresh Products</h3>
            <p>
              We provide fresh fruits,
              vegetables, bakery items and
              daily essentials.
            </p>
          </div>

          <div className="feature-card">
            <h3>💳 Secure Payments</h3>
            <p>
              Safe and secure checkout process
              for all your purchases.
            </p>
          </div>

          <div className="feature-card">
            <h3>⭐ Quality Service</h3>
            <p>
              Customer satisfaction is our
              priority with reliable support.
            </p>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="section about-store">
        <h2>About Our Store</h2>

        <p>
          Welcome to our online grocery store.
          We offer a convenient shopping
          experience for fresh fruits,
          vegetables, bakery products and
          everyday essentials. Our goal is to
          provide high-quality products at
          affordable prices with fast and
          reliable delivery.
        </p>
      </section>
    </div>
  );
}

export default Home;