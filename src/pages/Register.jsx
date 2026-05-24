import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { registerUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createJWT = (email) => {
    return fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    registerUser(email, password)
      .then(() => {
        return createJWT(email);
      })
      .then(() => {
        setSuccess("Registration Successful!");
        form.reset();

        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const email = result.user.email;

        return createJWT(email);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-red-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden">

        <div className="bg-gradient-to-r from-purple-600 to-red-500 p-10 text-center text-white">
          <h2 className="text-4xl font-bold">Create Account</h2>

          <p className="mt-3 text-purple-100">
            Join DriveFleet and start booking cars
          </p>
        </div>

        <form onSubmit={handleRegister} className="p-8">

          <div className="mb-5">
            <label className="font-semibold">Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full mt-2 border p-3 rounded-xl outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="font-semibold">Photo URL</label>

            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="w-full mt-2 border p-3 rounded-xl outline-none focus:border-purple-500"
            />
          </div>

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
              placeholder="Create strong password"
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
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-4 border-2 border-gray-300 hover:bg-gray-100 duration-300 py-3 rounded-xl font-semibold"
          >
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;