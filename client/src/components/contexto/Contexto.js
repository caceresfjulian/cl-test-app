import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggeado, setLoggeado] = useState(false);
  const [emailLoggeado, setEmailLoggeado] = useState("");

  async function verificarCookie() {
    await axios.get("http://localhost:4000/users/loggedIn").then((res) => {
      setLoggeado(res.data.value);
      setEmailLoggeado(res.data.email);
    });
  }

  useEffect(() => {
    verificarCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ loggeado, emailLoggeado, verificarCookie }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
