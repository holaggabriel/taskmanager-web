import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, } from "../redux/store";
import { clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import TAskList from "../components/TaskList";
import LogoutIcon from "../assets/log-out.svg";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import { persistor } from "../redux/store";
import { authService } from "../services/authService";


const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // 1. Llamada al backend para eliminar cookie
      await authService.signout();

      // 2. Limpiar Redux
      dispatch(clearUser());

      // 3. Limpiar persistencia
      await persistor.purge();

      // 4. Redirigir al login
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "700px",
        margin: "20px auto",
      }}
    >
      {/* Header superior */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 15px",
          borderRadius: "7px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          marginBottom: "30px",
          flexWrap: "wrap",
          border: "1px solid #e0e0e0",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            Bienvenid@,
            <span style={{ marginLeft: "4px" }}>
              <strong>{user?.name ?? "Not found"}</strong>
            </span>
          </p>
          <p style={{ fontSize: "14px", color: "#555", margin: "4px 0 0 0" }}>
            Usuario: {user?.username ?? "Not found"} | Correo: {user?.email ?? "Not found"}
          </p>
        </div>


        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            transition: "all 0.2s",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
        >
          <img src={LogoutIcon} alt="Logout" style={{ width: "18px", height: "18px" }} />
        </button>
      </div>

      {/* Lista de tareas */}
      <TAskList/>

      {/* Modal de confirmación logout */}
      <ConfirmLogoutModal
        isOpen={isModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
