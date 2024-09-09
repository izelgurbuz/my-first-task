import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Optionally: Make a request to the backend for logout (if session is stored there)
    // await axiosInstance.post('/logout');

    // Navigate to login page after logout
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
