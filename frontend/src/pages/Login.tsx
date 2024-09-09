import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../api/authApi";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false); // State to track loading

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: () => {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      await loginUser({ email, password });
      alert("User logged in successfully!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Login;
