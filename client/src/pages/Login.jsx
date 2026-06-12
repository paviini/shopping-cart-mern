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

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);  // Validation function
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
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
        </div>

        <div className="auth-panel">
          <form className="auth-form" onSubmit={submitHandler}>
            <label>
              Email address
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </label>

            <label>
              Password
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
            </div>

            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
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