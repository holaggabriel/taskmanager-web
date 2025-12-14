import { useNavigate } from "react-router-dom";
import {
  authContainerStyle,
  authCardStyle,
  authHeaderStyle,
  authTitleStyle,
  authSubtitleStyle,
  authButtonStyle,
} from "../styles/taskListStyles";

const SimpleNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={authContainerStyle}>
      <div style={authCardStyle}>
        <div style={authHeaderStyle}>
          <div style={{ 
            fontSize: "64px", 
            fontWeight: 700, 
            color: "#4CAF50", 
            marginBottom: "16px" 
          }}>
            404
          </div>
          <h1 style={authTitleStyle}>Página no encontrada</h1>
          <p style={authSubtitleStyle}>
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        <button
          onClick={() => navigate("/home")}
          style={{
            ...authButtonStyle,
            marginTop: "16px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#45a049";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4CAF50";
          }}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default SimpleNotFoundPage;