import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";

import RefreshIcon from "../assets/refresh.svg";
import DeleteIcon from "../assets/trash.svg";

interface DeletedTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTasksRestored?: () => void;
}

const DeletedTasksModal = ({
  isOpen,
  onClose,
  onTasksRestored,
}: DeletedTasksModalProps) => {
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeletedTasks = async () => {
    setLoading(true);
    try {
      const res = await taskService.getDeletedTasks();
      if (res.success && res.tasks) {
        setDeletedTasks(
          res.tasks.filter(
            (t): t is Task => t !== undefined && t !== null
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchDeletedTasks();
  }, [isOpen]);

  const handleRestore = async (id: string) => {
    const res = await taskService.restoreTaskById(id);
    if (res.success) {
      setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
      onTasksRestored?.();
    }
  };

  const handleRestoreAll = async () => {
    const res = await taskService.restoreAllTasks();
    if (res.success) {
      setDeletedTasks([]);
      onTasksRestored?.();
    }
  };

  const handleHardDelete = async (id: string) => {
    const res = await taskService.hardDeleteTaskById(id);
    if (res.success) {
      setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleHardDeleteAll = async () => {
    const res = await taskService.hardDeleteAllTasks();
    if (res.success) {
      setDeletedTasks([]);
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "#fbc02d";
      case "in_progress":
        return "#1976d2";
      case "completed":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "900px",
          maxHeight: "80vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <h2>Papelera de reciclaje</h2>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {loading ? (
          <p>Cargando...</p>
        ) : deletedTasks.length === 0 ? (
          <p>No hay tareas eliminadas.</p>
        ) : (
          <div
            style={{
              marginTop: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "7px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* CONTENEDOR CON SCROLL */}
            <div
              style={{
                maxHeight: "50vh",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: "900px",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={headerCellStyle}>Título</th>
                    <th style={headerCellStyle}>Descripción</th>
                    <th style={headerCellStyle}>Estado</th>
                    <th style={headerCellStyle}>Eliminado el</th>
                    <th style={headerCellStyle}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedTasks.map((task) => (
                    <tr key={task.id} style={rowStyle}>
                      <td style={cellStyle}>{task.title}</td>
                      <td style={{ ...cellStyle, color: "#555" }}>
                        {task.description}
                      </td>
                      <td style={cellStyle}>
                        <span
                          style={{
                            backgroundColor: getStatusColor(task.status),
                            color: "#fff",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: 500,
                            display: "inline-block",
                            minWidth: "90px",
                            textAlign: "center",
                          }}
                        >
                          {task.status === "pending"
                            ? "Pending"
                            : task.status === "in_progress"
                            ? "In Progress"
                            : "Completed"}
                        </span>
                      </td>
                      <td style={cellStyle}>
                        {task.deleted_at
                          ? new Date(task.deleted_at).toLocaleString()
                          : "-"}
                      </td>
                      <td style={cellStyle}>
                        <img
                          src={RefreshIcon}
                          alt="Restaurar"
                          title="Restaurar"
                          style={iconStyle}
                          onClick={() => handleRestore(task.id)}
                        />
                        <img
                          src={DeleteIcon}
                          alt="Eliminar definitivamente"
                          title="Eliminar definitivamente"
                          style={iconStyle}
                          onClick={() => handleHardDelete(task.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {deletedTasks.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button onClick={handleRestoreAll} style={buttonGreen}>
              Restaurar todo
            </button>

            <button
              onClick={handleHardDeleteAll}
              style={{ ...buttonGreen, backgroundColor: "#f44336" }}
            >
              Vaciar todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const headerCellStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  fontWeight: 600,
  fontSize: "14px",
  color: "#333",
  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #e0e0e0",
  position: "sticky",
  top: 0,
  zIndex: 1,
};

const rowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderBottom: "1px solid #e0e0e0",
};

const cellStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
  whiteSpace: "nowrap",
};

const iconStyle: React.CSSProperties = {
  width: "20px",
  marginRight: "10px",
  cursor: "pointer",
};

const buttonGreen: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4caf50",
  color: "#fff",
  cursor: "pointer",
};

export default DeletedTasksModal;
