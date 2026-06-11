import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import heroImg from "../assets/hero.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  const googleLogin = async () => {
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

      alert("Google login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Google login failed");
    }
  };

  return (
    <div className="auth-page auth-page--login">
      <section className="auth-card auth-card--reverse">
        <div className="auth-visual auth-visual--login">
          <div className="auth-visual-overlay" />
          <img src={heroImg} alt="Groceries and shopping essentials" />

          <div className="auth-visual-copy">
            <span className="auth-badge">Welcome back</span>
            <h2>Pick up right where you left off</h2>
            <p>
              Sign in to access your cart, checkout faster, and review orders.
            </p>

            <div className="auth-points">
              <span>Fast access</span>
              <span>Saved cart</span>
              <span>Order tracking</span>
            </div>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-header">
            <span className="auth-eyebrow">Sign in</span>
            <h1>Login</h1>
            <p>
              Good to see you again. Enter your details to continue shopping.
            </p>
          </div>

          <form className="auth-form" onSubmit={submitHandler}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button className="auth-primary-btn" type="submit">
              Login
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              className="auth-secondary-btn"
              type="button"
              onClick={googleLogin}
            >
              Continue with Google
            </button>

            <p className="auth-switch">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;