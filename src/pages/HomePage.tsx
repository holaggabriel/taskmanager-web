import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TrashList from "../components/TrashList";
import LogoutIcon from "../assets/log-out.svg";
import ConfirmationModal from "../components/ConfirmationModal";
import { persistor } from "../redux/store";
import { authService } from "../services/authService";
import * as styles from "../styles/taskListStyles";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = async () => {
    try {
      await authService.signout();
      dispatch(clearUser());
      await persistor.purge();
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "1200px",
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
            ...styles.dangerButtonStyle, 
          }}
        >
          <img src={LogoutIcon} alt="Cerrar sesiión" style={{ width: "18px", height: "18px" }} />
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab("active")}
          style={{
            ...styles.tabButton,
            ...(activeTab === "active" ? styles.activeTabStyles : styles.inactiveTabStyles),
          }}
        >
          Tareas
        </button>
        <button
          onClick={() => setActiveTab("deleted")}
          style={{
            ...styles.tabButton,
            ...(activeTab === "deleted" ? styles.deletedTabActiveStyles : styles.deletedTabInactiveStyles),
          }}
        >
          Papelera
        </button>

      </div>

      {/* Contenido según tab activo */}
      {activeTab === "active" ? (
        <TaskList refreshTrigger={refreshTrigger} onRefresh={handleRefresh} />
      ) : (
        <TrashList refreshTrigger={refreshTrigger} onRefresh={handleRefresh} />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        message="¿Estás seguro de que deseas cerrar sesión?"
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        confirmLabel="Sí, cerrar sesión"
        cancelLabel="Cancelar"
        title="Cierre de sesión"
        isSuccessButton={false} // Puedes mantener el botón de confirmación como un botón de error (rojo)
      />

    </div>
  );
};

export default HomePage;