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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 3) {
      newErrors.name =
        "Full name must be at least 3 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and a number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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

      const result = await signInWithPopup(
        auth,
        provider
      );

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

          <img
            src={heroImg}
            alt="Fresh groceries and a shopping basket"
          />

          <div className="auth-visual-copy">
            <span className="auth-badge">
              Join the store
            </span>

            <h2>Set up your account in a minute</h2>

            <p>
              Save favorites, track orders, and shop
              faster on every visit.
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
            <span className="auth-eyebrow">
              Create account
            </span>

            <h1>Register</h1>

            <p>
              Start shopping with a clean dashboard
              and faster checkout.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={submitHandler}
          >
            {/* Full Name */}
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              {errors.name && (
                <span className="error-text">
                  {errors.name}
                </span>
              )}
            </label>

            {/* Email */}
            <label>
              Email Address
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}
            </label>

            {/* Password */}
            <label>
              Password

              <div className="password-field">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.password && (
                <span className="error-text">
                  {errors.password}
                </span>
              )}
            </label>

            {/* Confirm Password */}
            <label>
              Confirm Password

              <div className="password-field">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="error-text">
                  {errors.confirmPassword}
                </span>
              )}
            </label>

            <button
              className="auth-primary-btn"
              type="submit"
            >
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
              Already have an account?{" "}
              <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;