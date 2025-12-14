import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import LogoutIcon from "../assets/log-out.svg";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";

const UserListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "700px",
        margin: "40px auto",
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
              <strong>{user}</strong>
            </span>
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

      {/* Lista de usuarios */}
      <UserList />

      {/* Modal de confirmación */}
      <ConfirmLogoutModal
        isOpen={isModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserListPage;
