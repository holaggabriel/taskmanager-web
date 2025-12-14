import React, { useState } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

type Props = {
    onClose: () => void;
    onTaskCreated: (task: Task) => void;
};

export const CreateTaskModal = ({ onClose, onTaskCreated }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) return alert("El título es obligatorio.");
        setLoading(true);
        try {
            const response = await taskService.createTask({ title, description });
            if (response.success && response.task) {
                onTaskCreated(response.task);
                onClose();
            } else {
                alert(response.message || "No se pudo crear la tarea.");
            }
        } catch {
            alert("No se pudo crear la tarea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3>Crear nueva tarea</h3>
                <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
                <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} style={textareaStyle} />
                <div style={{ textAlign: "right" }}>
                    <button onClick={onClose} style={modalButtonCancel}>Cancelar</button>
                    <button onClick={handleCreate} disabled={loading} style={modalButtonSave}>{loading ? "Creando..." : "Crear"}</button>
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

