import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = (email, password) => {
    const newUser = { email };
    setUser(newUser);
    return Promise.resolve(newUser);
  };

  const loginUser = (email, password) => {
    const loggedUser = { email };
    setUser(loggedUser);
    return Promise.resolve(loggedUser);
  };

  const logoutUser = () => {
    setUser(null);
    return Promise.resolve();
  };

  const authInfo = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;