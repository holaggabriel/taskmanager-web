import React, { useState, useEffect } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";
import * as styles from "../styles/taskListStyles";

type Props = {
    onClose: () => void;
    onTaskCreated?: (task: Task) => void;
};

export const CreateTaskModal = ({ onClose, onTaskCreated }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Manejar el cierre con Escape key (igual que ConfirmationModal)
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

    const handleCreate = async () => {
        if (!title.trim()) return alert("El título es obligatorio.");
        setLoading(true);
        try {
            const response = await taskService.createTask({ title, description });

            if (response.success) {
                // Mostrar alert de éxito
                alert("Tarea creada");

                // Llamar a onTaskCreated solo si existe
                if (onTaskCreated) {
                    onTaskCreated(response.task || null as any);
                }
                onClose(); // Siempre cerramos el modal si fue exitoso
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
        <div style={styles.modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={modalTitleStyle}>Crear nueva tarea</h3>

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={inputStyle}
                />

                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={textareaStyle}
                />

                <div style={modalButtonsContainer}>
                    <button
                        onClick={onClose}
                        style={{ ...styles.secondaryButtonStyle, border: "1px solid #ddd" }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        style={{
                            ...styles.primaryButtonStyle,
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Creando..." : "Crear"}
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