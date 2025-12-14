import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";

import RefreshIcon from "../assets/refresh.svg";
import TrashIcon from "../assets/trash.svg";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");

  const fetchDeletedTasks = async () => {
    setLoading(true);
    try {
      const res = await taskService.getDeletedTasks();
      if (res.success && res.tasks) {
        setDeletedTasks(
          res.tasks.filter((t): t is Task => t !== undefined && t !== null)
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

  // Filtrado local
  const filteredTasks = deletedTasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => statusFilter === "all" || t.status === statusFilter);

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

        {/* Búsqueda y filtro */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Task["status"] | "all")}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="all">Todos</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No se encontraron tareas eliminadas.</p>
        ) : (
          <div
            style={{
              marginTop: "15px",
              border: "1px solid #e0e0e0",
              borderRadius: "7px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ maxHeight: "50vh", overflowY: "auto", overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
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
                  {filteredTasks.map((task) => (
                    <tr key={task.id} style={rowStyle}>
                      <td style={cellStyle}>{task.title}</td>
                      <td style={{ ...cellStyle, color: "#555" }}>{task.description}</td>
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
                        {task.deleted_at ? new Date(task.deleted_at).toLocaleString() : "-"}
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
                          src={TrashIcon}
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

        {filteredTasks.length > 0 && (
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
