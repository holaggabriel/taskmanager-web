import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import EditIcon from "../assets/edit.svg";
import TrashIcon from "../assets/trash.svg";
import TrashIconFill from "../assets/trash-fill.svg";
import PlusIcon from "../assets/plus.svg";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import * as styles from "../styles/taskListStyles";
import ConfirmationModal from "../components/ConfirmationModal";

interface TaskListProps {
    refreshTrigger?: number;
    onRefresh?: () => void;
}

const TaskList = ({ refreshTrigger, onRefresh }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

    const refreshTasks = async () => {
        setLoading(true);
        try {
            const response = await taskService.getTasks();
            if (response.success) {
                const validTasks = (response.tasks ?? []).filter((t): t is Task => t !== undefined && t !== null);
                setTasks(validTasks);
            }
        } catch (error) {
            console.error("Error loading tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTasks();
    }, [refreshTrigger]);

    const filteredTasks = tasks
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .filter((t) => statusFilter === "all" || t.status === statusFilter);

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "#FFA726";
            case "in_progress": return "#42A5F5";
            case "completed": return "#66BB6A";
            default: return "#757575";
        }
    };

    const getStatusText = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "Pending";
            case "in_progress": return "In Progress";
            case "completed": return "Completed";
            default: return "Unknown";
        }
    };

    const handleSoftDeleteAll = async () => {
        const res = await taskService.softDeleteAllTasks();
        if (res.success) {
            await refreshTasks();
            setShowDeleteAllConfirm(false);
            if (onRefresh) onRefresh();
        } else {
            alert(res.message || "No se pudieron eliminar todas las tareas.");
        }
    };

    const SkeletonRow = () => (
        <tr>
            {Array.from({ length: 5 }).map((_, i) => (
                <td key={i} style={styles.cellStyle}>
                    <div className="shimmer-box" style={{ height: "16px", margin: "0" }}></div>
                </td>
            ))}
        </tr>
    );

    return (
        <div style={styles.containerStyle}>
            {/* Controles */}
            <div style={styles.controlsContainerStyle}>
                <SearchBar search={search} onSearchChange={setSearch} />
                <StatusFilter statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />

                <div style={styles.actionsContainerStyle}>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={styles.primaryButtonStyle}
                        title="Crear nueva tarea"
                    >
                        <img src={PlusIcon} alt="Nuevo" style={{ width: "16px", height: "16px" }} />
                    </button>

                    {filteredTasks.length > 0 && (
                        <button
                            onClick={() => setShowDeleteAllConfirm(true)}
                            style={styles.dangerButtonStyle}
                            title="Eliminar todas las tareas"
                        >
                            <img src={TrashIconFill} alt="Eliminar todo" style={{ width: "16px", height: "16px" }} />
                        </button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div style={styles.tableContainerStyle}>
                <table style={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th style={styles.headerCellStyle}>Título</th>
                            <th style={styles.headerCellStyle}>Descripción</th>
                            <th style={styles.headerCellStyle}>Estado</th>
                            <th style={styles.headerCellStyle}>Creado el</th>
                            <th style={styles.headerCellStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : filteredTasks.length > 0 ? (
                            filteredTasks.map((t) => (
                                <tr key={t.id} style={styles.rowStyle}>
                                    <td style={styles.cellStyle}>
                                        <div style={{ fontWeight: 500 }}>{t.title}</div>
                                    </td>
                                    <td style={{ ...styles.cellStyle, color: "#666" }}>
                                        <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {t.description || <span style={{ color: "#999", fontStyle: "italic" }}>Sin descripción</span>}
                                        </div>
                                    </td>
                                    <td style={styles.cellStyle}>
                                        <select
                                            value={t.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value as Task["status"];
                                                try {
                                                    const response = await taskService.updateTask(t.id, { ...t, status: newStatus });
                                                    if (response.success) {
                                                        await refreshTasks();
                                                    } else {
                                                        alert(response.message || "No se pudo actualizar el estado.");
                                                    }
                                                } catch {
                                                    alert("No se pudo actualizar el estado.");
                                                }
                                            }}
                                            style={{
                                                backgroundColor: getStatusColor(t.status),
                                                color: "#fff",
                                                padding: "6px 12px",
                                                borderRadius: "16px",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "12px",
                                                fontWeight: 500,
                                                minWidth: "120px"
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td style={{ ...styles.cellStyle, color: "#666", fontSize: "13px" }}>
                                        {formatDate(t.createdAt)}
                                    </td>
                                    <td style={styles.cellStyle}>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button
                                                onClick={() => setEditingTask(t)}
                                                style={styles.iconButtonStyle}
                                                title="Editar"
                                            >
                                                <img src={EditIcon} alt="Editar" style={{ width: "16px", height: "16px" }} />
                                            </button>
                                            <button
                                                onClick={() => setDeletingTask(t)}
                                                style={{ ...styles.iconButtonStyle, backgroundColor: "#FFE5E5" }}
                                                title="Eliminar"
                                            >
                                                <img src={TrashIcon} alt="Eliminar" style={{ width: "16px", height: "16px", filter: "invert(27%) sepia(86%) saturate(2847%) hue-rotate(345deg) brightness(95%) contrast(92%)" }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ ...styles.cellStyle, textAlign: "center", color: "#666" }}>
                                    <div style={{ padding: "32px" }}>
                                        {statusFilter !== "all" ?
                                            `No hay tareas con estado "${getStatusText(statusFilter as Task["status"])}".` :
                                            "No hay tareas disponibles."}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de confirmación para eliminar todo */}
            <ConfirmationModal
                isOpen={showDeleteAllConfirm}
                title="¿Eliminar todas las tareas? " // Título del modal
                message="Esta acción moverá todas las tareas activas a la papelera de reciclaje." // Cuerpo del mensaje
                confirmLabel="Eliminar Todo"
                cancelLabel="Cancelar"
                onConfirm={handleSoftDeleteAll}
                onCancel={() => setShowDeleteAllConfirm(false)}
            />

            {/* Modales */}
            {showCreateModal && (
                <CreateTaskModal
                    onClose={() => setShowCreateModal(false)}
                    onTaskCreated={async () => {
                        setShowCreateModal(false);
                        await refreshTasks();
                        if (onRefresh) onRefresh();
                    }}
                />
            )}

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onTaskUpdated={async () => {
                        setEditingTask(null);
                        await refreshTasks();
                        if (onRefresh) onRefresh();
                    }}
                />
            )}

            {deletingTask && (
                <DeleteTaskModal
                    task={deletingTask}
                    onClose={() => setDeletingTask(null)}
                    onTaskDeleted={async () => {
                        setDeletingTask(null);
                        await refreshTasks();
                        if (onRefresh) onRefresh();
                    }}
                />
            )}

            <style>{`
        .shimmer-box {
          background: linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
};

export default TaskList;