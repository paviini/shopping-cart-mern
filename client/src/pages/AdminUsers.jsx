import { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="admin-users-page">
      <div className="admin-page-header">
        <span className="admin-page-eyebrow">Registered users</span>
        <h1>User Management</h1><br></br>
        <p>View the details saved by registered users. This view is read-only.</p>
      </div>

      {loading && <p className="status-message">Loading users...</p>}

      {!loading && error && (
        <div className="empty-state">
          <h3>Unable to load users</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="empty-state">
          <h3>No registered users yet</h3>
          <p>Once users sign up and save their profile details, they will appear here.</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="admin-users-grid">
          {users.map((user) => (
            <article key={user._id} className="admin-user-card">
              <div className="admin-user-top">
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
                <span className={user.isAdmin ? "admin-chip admin-chip--accent" : "admin-chip"}>
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>

              <dl className="admin-user-details">
                <div><dt>Phone</dt><dd>{user.phone || "-"}</dd></div>
                <div><dt>Telephone</dt><dd>{user.telephone || "-"}</dd></div>
                <div><dt>Gender</dt><dd>{user.gender || "-"}</dd></div>
                <div><dt>City</dt><dd>{user.city || "-"}</dd></div>
                <div className="admin-user-details--wide"><dt>Address</dt><dd>{user.address || "-"}</dd></div>
                <div className="admin-user-details--wide"><dt>Bio</dt><dd>{user.bio || "-"}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;