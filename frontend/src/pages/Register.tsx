import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const queryClient = useQueryClient();

  const { mutateAsync: createUser } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchJobs"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true); // Set loading to true before calling the mutation
    try {
      await createUser({ name, email, password });
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed!");
    } finally {
      setLoading(false); // Set loading to false after the mutation
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
