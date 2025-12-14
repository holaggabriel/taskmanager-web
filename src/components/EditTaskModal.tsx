import React, { useState, useEffect } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

type Props = {
  task: Task;
  onClose: () => void;
  onTaskUpdated: (task: Task) => void;
};

export const EditTaskModal = ({ task, onClose, onTaskUpdated }: Props) => {
  const [editingTask, setEditingTask] = useState(task);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditingTask(task);
  }, [task]);

  const handleUpdate = async () => {
    if (!editingTask) return;
    setLoading(true);
    try {
      const updated = await taskService.updateTask(editingTask.id, {
        title: editingTask.title,
        description: editingTask.description,
      });
      onTaskUpdated(updated);
      onClose();
    } catch {
      alert("No se pudo actualizar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>Editar tarea</h3>
        <input type="text" value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} style={inputStyle} />
        <textarea value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} style={textareaStyle} />
        <div style={{ textAlign: "right" }}>
          <button onClick={onClose} style={modalButtonCancel}>Cancelar</button>
          <button onClick={handleUpdate} disabled={loading} style={modalButtonSave}>{loading ? "Guardando..." : "Guardar"}</button>
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = { padding: "8px", width: "100%", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" };
const textareaStyle: React.CSSProperties = { padding: "8px", width: "100%", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" };
const modalOverlayStyle: React.CSSProperties = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalContentStyle: React.CSSProperties = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", width: "400px", maxWidth: "90%" };
const modalButtonCancel: React.CSSProperties = { marginRight: "10px", padding: "8px 12px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer" };
const modalButtonSave: React.CSSProperties = { padding: "8px 12px", borderRadius: "5px", border: "none", backgroundColor: "#4caf50", color: "#fff", cursor: "pointer" };