import React, { useState, useEffect } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";
import * as styles from "../styles/taskListStyles";

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

    // Manejar el cierre con Escape key (igual que otros modales)
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    const handleUpdate = async () => {
        if (!editingTask) return;

        if (!editingTask.title.trim()) {
            alert("El título es obligatorio.");
            return;
        }

        setLoading(true);
        try {
            const response = await taskService.updateTask(editingTask.id, {
                title: editingTask.title,
                description: editingTask.description,
            });

            if (response.success && response.task) {
                onTaskUpdated(response.task);
                onClose();
            } else {
                alert(response.message || "No se pudo actualizar la tarea.");
            }
        } catch {
            alert("No se pudo actualizar la tarea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={modalTitleStyle}>Editar tarea</h3>

                <input
                    type="text"
                    placeholder="Título"
                    value={editingTask.title}
                    onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                    style={inputStyle}
                    autoFocus
                />

                <textarea
                    placeholder="Descripción"
                    value={editingTask.description}
                    onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                    style={textareaStyle}
                    rows={4}
                />

                <div style={modalButtonsContainer}>
                    <button
                        onClick={onClose}
                        style={{ ...styles.secondaryButtonStyle, border: "1px solid #ddd" }}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading || !editingTask.title.trim()}
                        style={{
                            ...styles.primaryButtonStyle,
                            opacity: (loading || !editingTask.title.trim()) ? 0.6 : 1,
                            cursor: (loading || !editingTask.title.trim()) ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Estilos adaptados al estilo de taskListStyles
const modalContentStyle: React.CSSProperties = {
    ...styles.modalStyle,
    maxWidth: "450px",
};

const modalTitleStyle: React.CSSProperties = {
    margin: "0 0 16px 0",
    color: "#333",
    fontSize: "18px",
    fontWeight: 600
};

const inputStyle: React.CSSProperties = {
    padding: "10px 12px",
    width: "100%",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "border-color 0.2s",
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    marginBottom: "20px",
    lineHeight: "1.5",
};

const modalButtonsContainer: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
};