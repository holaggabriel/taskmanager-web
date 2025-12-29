import { useState, useEffect } from "react";
import type { Task } from "../../types/task";
import { taskService } from "../../services/taskService";
import * as styles from "../../styles/taskListStyles";
import EditIcon from "../../assets/edit.svg";

type Props = {
    task: Task;
    onClose: () => void;
    onTaskUpdated: (task: Task) => void;
};

export const EditTaskModal = ({ task, onClose, onTaskUpdated }: Props) => {
    const [editingTask, setEditingTask] = useState(task);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar modo

    useEffect(() => {
        setEditingTask(task);
        // Resetear a modo visualización cuando se cambia la tarea
        setIsEditing(false);
    }, [task]);

    // Manejar el cierre con Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (isEditing) {
                    // Si está editando y presiona Escape, cancelar edición
                    setIsEditing(false);
                    setEditingTask(task); // Restaurar valores originales
                } else {
                    // Si está en modo visualización, cerrar modal
                    onClose();
                }
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isEditing, task, onClose]);

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
                setIsEditing(false); // Volver a modo visualización
            } else {
                alert(response.message || "No se pudo actualizar la tarea.");
            }
        } catch {
            alert("No se pudo actualizar la tarea.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingTask(task); // Restaurar valores originales
    };

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalContentStyle}>
                <div style={styles.modalHeaderStyle}>
                    <h3 style={styles.modalTitleStyle}>
                        {isEditing ? "Editar tarea" : "Detalles de la tarea"}
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={handleEditClick}
                            style={styles.iconButtonStyle}
                            title="Editar tarea"
                        >
                             <img src={EditIcon} alt="Editar" style={{ width: "16px", height: "16px" }} />
                        </button>
                    )}
                </div>

                {isEditing ? (
                    // Contenido para modo edición
                    <>
                        <input
                            type="text"
                            placeholder="Título"
                            value={editingTask.title}
                            onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                            style={styles.inputStyle}
                            autoFocus
                        />

                        <textarea
                            placeholder="Descripción"
                            value={editingTask.description}
                            onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                            style={styles.textareaStyle}
                            rows={4}
                        />
                    </>
                ) : (
                    // Contenido para modo visualización
                    <div style={styles.viewModeContentStyle}>
                        <div style={styles.viewFieldStyle}>
                            <label style={styles.viewLabelStyle}>Título:</label>
                            <div style={styles.viewValueStyle}>{editingTask.title}</div>
                        </div>
                        <div style={styles.viewFieldStyle}>
                            <label style={styles.viewLabelStyle}>Descripción:</label>
                            <div style={{...styles.viewValueStyle, whiteSpace: "pre-wrap"}}>
                                {editingTask.description || <span style={styles.placeholderStyle}>Sin descripción</span>}
                            </div>
                        </div>
                        {task.createdAt && (
                            <div style={styles.viewFieldStyle}>
                                <label style={styles.viewLabelStyle}>Creada:</label>
                                <div style={styles.viewValueStyle}>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={styles.modalButtonsContainer}>
                    {isEditing ? (
                        // Botones en modo edición
                        <>
                            <button
                                onClick={handleCancelEdit}
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
                        </>
                    ) : (
                        // Botón en modo visualización
                        <button
                            onClick={onClose}
                            style={{ ...styles.secondaryButtonStyle, marginLeft: "auto" }}
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};