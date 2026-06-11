import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import heroImg from "../assets/hero.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );

      console.log(error);
    }
  };

  const googleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      alert("Google signup successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Google signup failed");
    }
  };

  return (
    <div className="auth-page auth-page--register">
      <section className="auth-card">
        <div className="auth-visual auth-visual--register">
          <div className="auth-visual-overlay" />
          <img src={heroImg} alt="Fresh groceries and a shopping basket" />

          <div className="auth-visual-copy">
            <span className="auth-badge">Join the store</span>
            <h2>Set up your account in a minute</h2>
            <p>
              Save favorites, track orders, and shop faster on every visit.
            </p>

            <div className="auth-points">
              <span>Quick checkout</span>
              <span>Secure profiles</span>
              <span>Order history</span>
            </div>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-header">
            <span className="auth-eyebrow">Create account</span>
            <h1>Register</h1>
            <p>
              Start shopping with a clean dashboard and faster checkout.
            </p>
          </div>

          <form className="auth-form" onSubmit={submitHandler}>
            <label>
              Full name
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button className="auth-primary-btn" type="submit">
              Register
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              className="auth-secondary-btn"
              type="button"
              onClick={googleRegister}
            >
              Continue with Google
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
