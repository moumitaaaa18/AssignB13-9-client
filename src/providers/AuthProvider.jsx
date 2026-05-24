import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("drivefleet-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const createJwt = (loggedUser) => {
    return fetch("http://${import.meta.env.VITE_API_URL}/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loggedUser),
    });
  };

  const registerUser = (
    email,
    password,
    name = "",
    photoURL = ""
  ) => {
    const newUser = {
      email,
      displayName: name,
      photoURL,
    };

    setUser(newUser);

    localStorage.setItem(
      "drivefleet-user",
      JSON.stringify(newUser)
    );

    return createJwt(newUser).then(() => ({
      user: newUser,
    }));
  };

  const loginUser = (email, password) => {
    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return Promise.reject(
        new Error("Please enter a valid Gmail address")
      );
    }

    const loggedUser = { email };

    setUser(loggedUser);

    localStorage.setItem(
      "drivefleet-user",
      JSON.stringify(loggedUser)
    );

    return createJwt(loggedUser).then(() => ({
      user: loggedUser,
    }));
  };

  const googleLogin = () => {
    const email = prompt("Enter your Gmail address");

    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!email || !gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address");

      return Promise.reject(
        new Error("Invalid Gmail")
      );
    }

    const googleUser = {
      email,
      displayName: email.split("@")[0],
      photoURL: "",
    };

    setUser(googleUser);

    localStorage.setItem(
      "drivefleet-user",
      JSON.stringify(googleUser)
    );

    return Promise.resolve({
      user: googleUser,
    });
  };

  const logoutUser = () => {
    setUser(null);

    localStorage.removeItem("drivefleet-user");

    return fetch('${import.meta.env.VITE_API_URL}/logout', {
      method: "POST",
      credentials: "include",
    });
  };

  const authInfo = {
    user,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;