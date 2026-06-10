import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
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

      // Redirect to Login Page
      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;