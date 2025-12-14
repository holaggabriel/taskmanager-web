import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.svg";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== "") {
      dispatch(login(username.trim()));
      setUsername("");
      navigate("/users");
    } else {
      alert("Por favor, ingresa un nombre");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "400px",
        margin: "80px auto",
        textAlign: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "7px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Lista de usuarios</h1>
      <div style={{ position: "relative", marginBottom: "20px" }}>
  <img
    src={userIcon}
    alt="Usuario"
    style={{
      position: "absolute",
      left: "10px", // ahora está a la izquierda
      top: "50%",
      transform: "translateY(-50%)",
      width: "18px",
      height: "18px",
    }}
  />
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Tu nombre"
    style={{
      padding: "10px 10px 10px 40px", // espacio para el icono a la izquierda
      fontSize: "16px",
      width: "100%",
      borderRadius: "7px",
      border: "1px solid #ccc",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
</div>

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "7px",
          cursor: "pointer",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          transition: "background-color 0.2s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1565c0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#1976d2")
        }
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default LoginPage;
