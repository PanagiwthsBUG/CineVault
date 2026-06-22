import { useState } from "react";
import api from "../api/axios";

function Login() {

  const [form, setForm] = useState({
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
        "/auth/login",
        form
      );


      localStorage.setItem(
        "token",
        response.data.token
      );


      alert("Login successful");


    } catch (error) {

      console.error(error.response?.data);

      alert("Login failed");

    }
  };


  return (
    <div>

      <h2>Login</h2>


      <form onSubmit={handleSubmit}>


        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />


        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />


        <button>
          Login
        </button>


      </form>

    </div>
  );
}


export default Login;