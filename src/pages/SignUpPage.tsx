import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import {
  authContainerStyle,
  authCardStyle,
  authHeaderStyle,
  authTitleStyle,
  authSubtitleStyle,
  authFormStyle,
  authInputGroupStyle,
  authLabelStyle,
  authInputStyle,
  authInputWrapperStyle,
  authButtonStyle,
  authDividerStyle,
  authDividerLineStyle,
  authDividerTextStyle,
  authFooterStyle,
  authLinkStyle,
  errorMessageStyle,
  successMessageStyle,
} from "../styles/taskListStyles";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Por favor, ingresa un correo electrónico válido");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authService.signup({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.success) {
        setSuccess("Registro exitoso. Redirigiendo al inicio de sesión...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError(response.message || "Error al registrarse");
      }
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.message || "Error en la conexión con el servidor"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <div style={authContainerStyle}>
      <div style={authCardStyle}>
        <div style={authHeaderStyle}>
          <h1 style={authTitleStyle}>Crear Cuenta</h1>
          <p style={authSubtitleStyle}>
            Regístrate para empezar a usar la aplicación
          </p>
        </div>

        {error && (
          <div style={errorMessageStyle}>
            {error}
          </div>
        )}

        {success && (
          <div style={successMessageStyle}>
            {success}
          </div>
        )}

        <div style={authFormStyle}>
          <div style={authInputGroupStyle}>
            <label style={authLabelStyle}>Nombre Completo</label>
            <div style={authInputWrapperStyle}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                style={authInputStyle}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          <div style={authInputGroupStyle}>
            <label style={authLabelStyle}>Nombre de Usuario</label>
            <div style={authInputWrapperStyle}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="juanperez"
                style={authInputStyle}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          <div style={authInputGroupStyle}>
            <label style={authLabelStyle}>Correo Electrónico</label>
            <div style={authInputWrapperStyle}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={authInputStyle}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          <div style={authInputGroupStyle}>
            <label style={authLabelStyle}>Contraseña</label>
            <div style={authInputWrapperStyle}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={authInputStyle}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            style={{
              ...authButtonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#45a049";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#4CAF50";
              }
            }}
          >
            {loading ? (
              <>
                Registrando...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </div>

        <div style={authDividerStyle}>
          <div style={authDividerLineStyle} />
          <span style={authDividerTextStyle}>¿Ya tienes cuenta?</span>
          <div style={authDividerLineStyle} />
        </div>

        <div style={authFooterStyle}>
          <p>
            Inicia sesión{" "}
            <span
              style={authLinkStyle}
              onClick={() => navigate("/signin")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#388e3c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4CAF50";
              }}
            >
              aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;