import { useState } from "react";
import api from "../api/axios";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/register",
        form
      );

      console.log(response.data);

      alert("User created!");

    } catch (error) {

      console.error(error.response?.data);

      alert("Register failed");

    }
  };


  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}


export default Register;