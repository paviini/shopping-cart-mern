import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminUsers from "./pages/AdminUsers";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AdminOrders from "./pages/AdminOrders";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-shell">
        <Routes>
          {/* User Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          {/* Admin Pages */}
          <Route path="/admin"element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products"element={<AdminRoute><AdminProducts /></AdminRoute>}/>
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;