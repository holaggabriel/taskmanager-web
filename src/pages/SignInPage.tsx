import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.svg";
import { authService } from "../services/authService";

const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (identifier.trim() === "" || password.trim() === "") {
      alert("Por favor, ingresa tu usuario o correo y contraseña");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signin({
        identifier: identifier.trim(),
        password: password.trim(),
      });

      if (response.success) {
        dispatch(login(identifier.trim())); // guarda el identificador en Redux
        navigate("/home"); // redirige a la página protegida
      } else {
        alert(response.message || "Error al iniciar sesión");
      }
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message || "Error en la conexión con el servidor"
      );
    } finally {
      setLoading(false);
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
    <h1 style={{ marginBottom: "20px" }}>Iniciar sesión</h1>

    <div style={{ position: "relative", marginBottom: "20px" }}>
      <img
        src={userIcon}
        alt="Usuario"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "18px",
          height: "18px",
        }}
      />
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Usuario o correo"
        style={{
          padding: "10px 10px 10px 40px",
          fontSize: "16px",
          width: "100%",
          borderRadius: "7px",
          border: "1px solid #ccc",
          outline: "none",
          boxSizing: "border-box",
          marginBottom: "10px",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        style={{
          padding: "10px",
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
      disabled={loading}
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
      {loading ? "Ingresando..." : "Iniciar sesión"}
    </button>

    {/* Enlace a la página de registro */}
    <p style={{ marginTop: "20px" }}>
      ¿No tienes cuenta?{" "}
      <span
        style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
        onClick={() => navigate("/signup")}
      >
        Regístrate aquí
      </span>
    </p>
  </div>
);
};

export default SignInPage;
