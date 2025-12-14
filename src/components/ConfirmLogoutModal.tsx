import React, { useEffect } from "react";

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  // Maneja cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          minWidth: "300px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>¿Deseas cerrar sesión?</h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#d32f2f",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
