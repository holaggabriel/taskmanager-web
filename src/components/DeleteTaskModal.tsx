import React, { useState } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

type Props = {
  task: Task;
  onClose: () => void;
  onTaskDeleted: (taskId: string) => void;
};

export const DeleteTaskModal = ({ task, onClose, onTaskDeleted }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await taskService.softDeleteTask(task.id);
      onTaskDeleted(task.id);
      onClose();
    } catch {
      alert("No se pudo eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>Confirmar eliminación</h3>
        <p>¿Seguro que deseas eliminar la tarea "{task.title}"?</p>
        <div style={{ textAlign: "right" }}>
          <button onClick={onClose} style={modalButtonCancel}>Cancelar</button>
          <button onClick={handleDelete} disabled={loading} style={modalButtonDelete}>{loading ? "Eliminando..." : "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalContentStyle: React.CSSProperties = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px", maxWidth: "90%" };
const modalButtonCancel: React.CSSProperties = { marginRight: "10px", padding: "8px 12px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer" };
const modalButtonDelete: React.CSSProperties = { padding: "8px 12px", borderRadius: "5px", border: "none", backgroundColor: "#f44336", color: "#fff", cursor: "pointer" };
