import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../api/authApi";
import "../style/Login-Register.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/");
    },
    onError: (error) => {
      // Handle the error, for example, display an error message
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Login");
    e.preventDefault();

    setLoading(true);
    try {
      await loginUser({ email, password });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
