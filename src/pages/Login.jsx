import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createJWT = (email) => {
    return fetch("http://https://assign-b13-9-server-g6yqnhpe1-moumitaaaa18s-projects.vercel.app/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        return createJWT(email);
      })
      .then(() => {
        setSuccess("Login Successful!");
        form.reset();
        setTimeout(() => navigate("/"), 800);
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const email = result?.user?.email || "googleuser@gmail.com";
        return createJWT(email);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-red-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-red-500 p-10 text-center text-white">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="mt-3 text-purple-100">
            Login to continue using DriveFleet
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8">
          <div className="mb-5">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-2 border p-3 rounded-xl outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-2 border p-3 rounded-xl outline-none focus:border-purple-500"
              required
            />
          </div>

          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-600 p-3 rounded-xl mb-4 text-center font-medium">
              {success}
            </p>
          )}

          <button className="w-full bg-gradient-to-r from-purple-600 to-red-500 text-white py-3 rounded-xl text-lg font-semibold">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-4 border-2 border-gray-300 hover:bg-gray-100 duration-300 py-3 rounded-xl font-semibold"
          >
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;