import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <nav className="site-nav">
      <h2>🛒 Shopping Cart</h2>

      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}
      <Link to="/cart">
        Cart ({cart.length})
      </Link>{" "}
      |{" "}
      <Link to="/admin">
        Admin
      </Link>{" "}
      |{" "}

      {userInfo ? (
        <>
          <span
            style={{
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            Welcome, {userInfo.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            Login
          </Link>{" "}
          |{" "}
          <Link to="/register">
            Register
          </Link>
          <Link to="/profile">
            Profile
          </Link>
          <Link to="/checkout">
            Checkout
          </Link>
        </>
      )}
      {
        userInfo?.photo && (
          <img
            src={userInfo.photo}
            alt=""
            width="40"
            height="40"
          />
   
        )
      }
    </nav>
  );
}

export default Navbar;