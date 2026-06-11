import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    telephone: "",
    gender: "",
    address: "",
    city: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!userInfo?.token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/users/profile");
        setForm({
          name: res.data?.name || "",
          email: res.data?.email || "",
          phone: res.data?.phone || "",
          telephone: res.data?.telephone || "",
          gender: res.data?.gender || "",
          address: res.data?.address || "",
          city: res.data?.city || "",
          bio: res.data?.bio || "",
        });
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userInfo?.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await API.put("/users/profile", form);
      const updatedUser = {
        ...userInfo,
        ...res.data,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setMessage("Profile saved successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!userInfo?.token) {
    return (
      <div className="profile-page profile-page--empty">
        <div className="profile-hero">
          <span className="profile-badge">Profile</span>
          <h1>Your profile needs a sign-in</h1>
          <p>Log in to manage your personal details and let admins review your registered account information.</p>
          <Link className="profile-link-btn" to="/login">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <section className="profile-shell">
        <aside className="profile-card profile-card--summary">
          <span className="profile-badge">Account</span>
          <h1>My Profile</h1>
          <p className="profile-summary">Keep your contact details, gender, and address current so your account stays complete.</p>

          <div className="profile-summary-list">
            <div><span>Name</span><strong>{form.name || userInfo.name}</strong></div>
            <div><span>Email</span><strong>{form.email || userInfo.email}</strong></div>
            <div><span>Phone</span><strong>{form.phone || "Not set"}</strong></div>
            <div><span>Gender</span><strong>{form.gender || "Not set"}</strong></div>
          </div>
        </aside>

        <section className="profile-card profile-card--form">
          <div className="profile-card-header">
            <div>
              <span className="profile-eyebrow">Edit details</span>
              <h2>Personal information</h2>
            </div>
            <p>Only you can edit this profile. Admins can view the saved registered user details.</p>
          </div>

          {loading ? (
            <p className="status-message">Loading profile...</p>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input name="name" value={form.name} onChange={handleChange} />
              </label>

              <label>
                Email address
                <input name="email" value={form.email} disabled />
              </label>

              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
              </label>

              <label>
                Telephone
                <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Enter telephone number" />
              </label>

              <label>
                Gender
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </label>

              <label>
                City
                <input name="city" value={form.city} onChange={handleChange} placeholder="Enter city" />
              </label>

              <label className="profile-form--wide">
                Address
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter your address" rows="3" />
              </label>

              <label className="profile-form--wide">
                Bio
                <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Write a short bio" rows="4" />
              </label>

              {message && <p className="profile-message">{message}</p>}

              <div className="profile-actions">
                <button type="submit" className="profile-save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save profile"}
                </button>
              </div>
            </form>
          )}
        </section>
      </section>
    </div>
  );
}

export default Profile;