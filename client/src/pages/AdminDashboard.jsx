import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Welcome back,
            <strong> {userInfo?.name || "Admin"}</strong>
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-section">

        <div className="stat-box">
          <h3>150</h3>
          <p>Total Products</p>
        </div>

        <div className="stat-box">
          <h3>80</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-box">
          <h3>55</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-box">
          <h3>LKR 125,000</h3>
          <p>Total Revenue</p>
        </div>

      </div>

      {/* Management Cards */}
      <h2 className="section-title">
        Management
      </h2>

      <div className="dashboard-cards">

        <Link
          to="/admin/products"
          className="dashboard-card"
        >
          <div className="card-icon">
            📦
          </div>

          <h3>Products</h3>

          <p>
            Add, edit and remove products
          </p>
        </Link>

        <Link
          to="/admin/categories"
          className="dashboard-card"
        >
          <div className="card-icon">
            📂
          </div>

          <h3>Categories</h3>

          <p>
            Manage categories
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="dashboard-card"
        >
          <div className="card-icon">
            👥
          </div>

          <h3>Users</h3>

          <p>
            Manage registered users
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="dashboard-card"
        >
          <div className="card-icon">
            🛒
          </div>

          <h3>Orders</h3>

          <p>
            Track customer orders
          </p>
        </Link>

      </div>

      {/* Recent Activity */}
      <div className="activity-section">

        <h2>
          Recent Activity
        </h2>

        <ul>
          <li>
            New order placed
          </li>

          <li>
            Product added
          </li>

          <li>
            User registered
          </li>

          <li>
            Category updated
          </li>
        </ul>

      </div>

    </div>
  );
}

export default AdminDashboard;