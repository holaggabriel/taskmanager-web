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
} from "../styles/taskListStyles";

const SignInPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (identifier.trim() === "" || password.trim() === "") {
      setError("Por favor, ingresa tu usuario o correo y contraseña");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await authService.signin({
        identifier: identifier.trim(),
        password: password.trim(),
      });

      if (response.success) {
        navigate("/home");
      } else {
        setError(response.message || "Error al iniciar sesión");
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
      handleLogin();
    }
  };

  return (
    <div style={authContainerStyle}>
      <div style={authCardStyle}>
        <div style={authHeaderStyle}>
          <h1 style={authTitleStyle}>Iniciar Sesión</h1>
          <p style={authSubtitleStyle}>
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {error && (
          <div style={errorMessageStyle}>
            {error}
          </div>
        )}

        <div style={authFormStyle}>
          <div style={authInputGroupStyle}>
            <label style={authLabelStyle}>Usuario o Correo</label>
            <div style={authInputWrapperStyle}>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="usuario@ejemplo.com"
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
            onClick={handleLogin}
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
                Ingresando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </div>

        <div style={authDividerStyle}>
          <div style={authDividerLineStyle} />
          <span style={authDividerTextStyle}>¿No tienes cuenta?</span>
          <div style={authDividerLineStyle} />
        </div>

        <div style={authFooterStyle}>
          <p>
            Crea una cuenta{" "}
            <span
              style={authLinkStyle}
              onClick={() => navigate("/signup")}
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

export default SignInPage;