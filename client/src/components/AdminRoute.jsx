import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return userInfo?.isAdmin
    ? children
    : <Navigate to="/" />;
}

export default AdminRoute;