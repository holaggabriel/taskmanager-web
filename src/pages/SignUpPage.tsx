import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import userIcon from "../assets/user.svg";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signup({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.success) {
        alert("Registro exitoso, ya puedes iniciar sesión");
        navigate("/signin"); // redirige al login
      } else {
        alert(response.message || "Error al registrarse");
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
      <h1 style={{ marginBottom: "20px" }}>Registro</h1>

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
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
      </div>

      <button
        onClick={handleSignUp}
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
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <p style={{ marginTop: "20px" }}>
        ¿Ya tienes cuenta?{" "}
        <span
          style={{
            color: "#1976d2",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/signin")}
        >
          Inicia sesión
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
