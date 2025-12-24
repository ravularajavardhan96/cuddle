import { createContext, useState } from "react";
import axios from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const client = axios.create({
  baseURL: "http://localhost:8000/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // REGISTER
  const handleRegister = async (fullname, username, password) => {
    try {
      const res = await client.post("/register", {
        name: fullname,
        username,
        password,
      });

      if (res.status === httpStatus.CREATED) {
        console.log("1");
        return res.data.message; // string
      }
      return null;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return null;
    }
  };

  // LOGIN (optional, if exists in backend)
  const Login = async (username, password) => {
    console.log("2");
    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        username,
        password,
      });

      if (res.status === httpStatus.OK) {
        localStorage.setItem("token",res.data.token);
        console.log(res.data.token);
        setUserData(res.data.user);
        setTimeout(()=>{
             navigate("/");
        },2000)
       
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, handleRegister, Login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
