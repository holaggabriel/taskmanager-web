import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import EditIcon from "../assets/edit.svg";
import TrashIcon from "../assets/trash.svg";
import TrashIconFill from "../assets/trash-fill.svg";
import PlusIcon from "../assets/plus.svg";
import RefreshIcon from "../assets/refresh.svg";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import * as styles from "../styles/taskListStyles";
import Tabs from "./Tabs";

interface TaskListProps {
    refreshTrigger?: number;
}

const TaskList = ({ refreshTrigger }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");
    const [loading, setLoading] = useState(false);
    const [loadingDeleted, setLoadingDeleted] = useState(false);
    const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

    const refreshTasks = async () => {
        if (activeTab === "active") {
            setLoading(true);
        } else {
            setLoadingDeleted(true);
        }

        try {
            if (activeTab === "active") {
                const response = await taskService.getTasks();
                if (response.success) {
                    setTasks((response.tasks ?? []).filter((t): t is Task => t !== undefined && t !== null));
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else {
                const response = await taskService.getDeletedTasks();
                if (response.success && response.tasks) {
                    setDeletedTasks(response.tasks.filter((t): t is Task => t !== undefined && t !== null));
                    setLoadingDeleted(false);
                } else {
                    setLoadingDeleted(false);
                }
            }
        } catch {
            if (activeTab === "active") {
                setLoading(false);
            } else {
                setLoadingDeleted(false);
            }
        }
    };

    useEffect(() => {
        refreshTasks();
    }, [refreshTrigger, activeTab]);

    const filteredTasks = tasks
        .filter((t): t is Task => t !== undefined && t !== null)
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .filter((t) => statusFilter === "all" || t.status === statusFilter);

    const filteredDeletedTasks = deletedTasks
        .filter((t): t is Task => t !== undefined && t !== null)
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

    const handleRestore = async (id: string) => {
        const res = await taskService.restoreTaskById(id);
        if (res.success) {
            setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
            if (activeTab === "active") {
                await refreshTasks();
            }
        }
    };

    const handleHardDelete = async (id: string) => {
        const res = await taskService.hardDeleteTaskById(id);
        if (res.success) {
            setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleRestoreAll = async () => {
        const res = await taskService.restoreAllTasks();
        if (res.success) {
            setDeletedTasks([]);
            if (activeTab === "active") {
                await refreshTasks();
            }
        }
    };

    const handleHardDeleteAll = async () => {
        const res = await taskService.hardDeleteAllTasks();
        if (res.success) {
            setDeletedTasks([]);
        }
    };

    const handleSoftDeleteAll = async () => {
        const res = await taskService.softDeleteAllTasks();
        if (res.success) {
            await refreshTasks();
            setShowDeleteAllConfirm(false);
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

    const ActiveTasksTable = () => (
        <>
            {filteredTasks.length > 0 ? (
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
        </>
    );

    const DeletedTasksTable = () => (
        <>
            {filteredDeletedTasks.length > 0 ? (
                filteredDeletedTasks.map((task) => (
                    <tr key={task.id} style={styles.rowStyle}>
                        <td style={styles.cellStyle}>
                            <div style={{ fontWeight: 500, color: "#666" }}>{task.title}</div>
                        </td>
                        <td style={{ ...styles.cellStyle, color: "#999" }}>
                            <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {task.description || <span style={{ color: "#BBB", fontStyle: "italic" }}>Sin descripción</span>}
                            </div>
                        </td>
                        <td style={styles.cellStyle}>
                            <span
                                style={{
                                    backgroundColor: getStatusColor(task.status),
                                    color: "#fff",
                                    padding: "4px 12px",
                                    borderRadius: "16px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    display: "inline-block"
                                }}
                            >
                                {getStatusText(task.status)}
                            </span>
                        </td>
                        <td style={{ ...styles.cellStyle, color: "#999", fontSize: "13px" }}>
                            {task.deleted_at ? formatDate(task.deleted_at) : "-"}
                        </td>
                        <td style={styles.cellStyle}>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    onClick={() => handleRestore(task.id)}
                                    style={{ ...styles.iconButtonStyle, backgroundColor: "#E8F5E9" }}
                                    title="Restaurar"
                                >
                                    <img src={RefreshIcon} alt="Restaurar" style={{ width: "16px", height: "16px", filter: "invert(47%) sepia(64%) saturate(487%) hue-rotate(87deg) brightness(95%) contrast(91%)" }} />
                                </button>
                                <button
                                    onClick={() => handleHardDelete(task.id)}
                                    style={{ ...styles.iconButtonStyle, backgroundColor: "#FFE5E5" }}
                                    title="Eliminar permanentemente"
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
                                `No hay tareas eliminadas con estado "${getStatusText(statusFilter as Task["status"])}".` :
                                "No hay tareas eliminadas."}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );

    const getTableHeaders = () => {
        const headers = ["Título", "Descripción", "Estado", activeTab === "active" ? "Creado el" : "Eliminado el", "Acciones"];
        return (
            <tr>
                {headers.map((header, index) => (
                    <th key={index} style={styles.headerCellStyle}>
                        {header}
                    </th>
                ))}
            </tr>
        );
    };

    return (
        <div style={styles.containerStyle}>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Controles */}
            <div style={styles.controlsContainerStyle}>
                {/* Componente SearchBar */}
                <SearchBar search={search} onSearchChange={setSearch} />

                {/* Componente StatusFilter */}
                <StatusFilter statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />

                {activeTab === "active" && (
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
                )}
            </div>

            {/* Tabla */}
            <div style={styles.tableContainerStyle}>
                <table style={styles.tableStyle}>
                    <thead>
                        {getTableHeaders()}
                    </thead>
                    <tbody>
                        {(activeTab === "active" ? loading : loadingDeleted) ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : (
                            activeTab === "active" ? <ActiveTasksTable /> : <DeletedTasksTable />
                        )}
                    </tbody>
                </table>
            </div>


            {/* Botones masivos para tareas eliminadas */}
            {activeTab === "deleted" && filteredDeletedTasks.length > 0 && (
                <div style={styles.bulkActionsStyle}>
                    <button onClick={handleRestoreAll} style={styles.secondaryButtonStyle}>
                        Restaurar Todo
                    </button>
                    <button onClick={handleHardDeleteAll} style={styles.dangerButtonStyle}>
                        Vaciar Todo
                    </button>
                </div>
            )}

            {/* Modal de confirmación para eliminar todo */}
            {showDeleteAllConfirm && (
                <div style={styles.modalOverlayStyle}>
                    <div style={styles.modalStyle}>
                        <h3 style={{ margin: "0 0 16px 0", color: "#333" }}>¿Eliminar todas las tareas?</h3>
                        <p style={{ margin: "0 0 24px 0", color: "#666", lineHeight: "1.5" }}>
                            Esta acción moverá todas las {filteredTasks.length} tareas activas a la papelera de reciclaje.
                            Podrás restaurarlas más tarde si es necesario.
                        </p>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setShowDeleteAllConfirm(false)}
                                style={{ ...styles.secondaryButtonStyle, border: "1px solid #ddd" }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSoftDeleteAll}
                                style={styles.dangerButtonStyle}
                            >
                                Eliminar Todo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modales */}
            {showCreateModal && (
                <CreateTaskModal
                    onClose={() => setShowCreateModal(false)}
                    onTaskCreated={async () => {
                        setShowCreateModal(false);
                        await refreshTasks();
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