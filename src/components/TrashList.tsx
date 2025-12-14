import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import TrashIcon from "../assets/trash.svg";
import TrashIconFill from "../assets/trash-fill.svg";
import RefreshIcon from "../assets/refresh.svg";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import * as styles from "../styles/taskListStyles";
import ConfirmationModal from "../components/ConfirmationModal";

interface TrashListProps {
    refreshTrigger?: number;
    onRefresh?: () => void;
}

const TrashList = ({ refreshTrigger, onRefresh }: TrashListProps) => {
    const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");
    const [loading, setLoading] = useState(false);
    const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

    // Estados para modales individuales
    const [showRestoreTaskModal, setShowRestoreTaskModal] = useState(false);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const refreshDeletedTasks = async () => {
        setLoading(true);  // Activa el estado de cargando

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const response = await taskService.getDeletedTasks();
            if (response.success && response.tasks) {
                const validTasks = response.tasks.filter((t): t is Task => t !== undefined && t !== null);
                setDeletedTasks(validTasks);
            }
        } catch (error) {
            console.error("Error loading deleted tasks:", error);
        } finally {
            setLoading(false);  // Desactiva el estado de cargando
        }
    };


    useEffect(() => {
        refreshDeletedTasks();
    }, [refreshTrigger]);

    const filteredDeletedTasks = deletedTasks
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

    // Abrir modal para restaurar tarea individual
    const openRestoreTaskModal = (task: Task) => {
        setSelectedTask(task);
        setShowRestoreTaskModal(true);
    };

    // Abrir modal para eliminar tarea individual
    const openDeleteTaskModal = (task: Task) => {
        setSelectedTask(task);
        setShowDeleteTaskModal(true);
    };

    // Restaurar tarea individual
    const handleRestoreTask = async () => {
        if (!selectedTask) return;

        // Cerrar el modal primero
        setShowRestoreTaskModal(false);

        const res = await taskService.restoreTaskById(selectedTask.id);
        if (res.success) {
            setDeletedTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
            if (onRefresh) onRefresh();
        }
        setShowRestoreTaskModal(false);
        setSelectedTask(null);
    };

    // Eliminar tarea individual permanentemente
    const handleDeleteTask = async () => {
        if (!selectedTask) return;

        // Cerrar el modal primero
        setShowDeleteTaskModal(false);
        const res = await taskService.hardDeleteTaskById(selectedTask.id);
        if (res.success) {
            setDeletedTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
        }
        setShowDeleteTaskModal(false);
        setSelectedTask(null);
    };

    const handleRestoreAll = async () => {
        setShowRestoreConfirm(false);
        const res = await taskService.restoreAllTasks();
        if (res.success) {
            setDeletedTasks([]);
            if (onRefresh) onRefresh();
        }
        setShowRestoreConfirm(false);
    };

    const handleHardDeleteAll = async () => {
        setShowEmptyConfirm(false);
        const res = await taskService.hardDeleteAllTasks();
        if (res.success) {
            setDeletedTasks([]);
            setShowEmptyConfirm(false);
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

                {deletedTasks.length > 0 && (
                    <div style={styles.actionsContainerStyle}>
                        <button
                            onClick={() => setShowRestoreConfirm(true)}
                            style={styles.secondaryButtonStyle}
                            title="Restaurar todas las tareas"
                        >
                            <img src={RefreshIcon} alt="Restaurar" style={{ width: "16px", height: "16px" }} />
                        </button>
                        <button
                            onClick={() => setShowEmptyConfirm(true)}
                            style={styles.dangerButtonStyle}
                            title="Eliminar permanentemente todas las tareas"
                        >
                            <img src={TrashIconFill} alt="Vaciar" style={{ width: "16px", height: "16px" }} />
                        </button>
                    </div>
                )}
            </div>

            {/* Tabla */}
            <div style={styles.tableContainerStyle}>
                <table style={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th style={styles.headerCellStyle}>Título</th>
                            <th style={styles.headerCellStyle}>Descripción</th>
                            <th style={styles.headerCellStyle}>Estado</th>
                            <th style={styles.headerCellStyle}>Eliminado el</th>
                            <th style={styles.headerCellStyle}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : filteredDeletedTasks.length > 0 ? (
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
                                        {/* Badge de estado */}
                                        <div style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            backgroundColor: `${getStatusColor(task.status)}15`,
                                            color: getStatusColor(task.status),
                                            padding: "6px 12px",
                                            borderRadius: "16px",
                                            border: `1px solid ${getStatusColor(task.status)}30`,
                                            fontSize: "12px",
                                            fontWeight: 500,
                                            opacity: 0.8
                                        }}>
                                            <div style={{
                                                width: "8px",
                                                height: "8px",
                                                borderRadius: "50%",
                                                backgroundColor: getStatusColor(task.status)
                                            }} />
                                            {getStatusText(task.status)}
                                        </div>
                                    </td>
                                    <td style={{ ...styles.cellStyle, color: "#999", fontSize: "13px" }}>
                                        {task.deleted_at ? formatDate(task.deleted_at) : "-"}
                                    </td>
                                    <td style={{ ...styles.cellStyle, width: "60px", minWidth: "60", padding: "10px", }}>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button
                                                onClick={() => openRestoreTaskModal(task)}
                                                style={{
                                                    ...styles.iconButtonStyle,
                                                    backgroundColor: "#E8F5E9",
                                                    transition: "all 0.2s ease",
                                                }}
                                                title="Restaurar"
                                            >
                                                <img src={RefreshIcon} alt="Restaurar" style={{ width: "16px", height: "16px", filter: "invert(47%) sepia(64%) saturate(487%) hue-rotate(87deg) brightness(95%) contrast(91%)" }} />
                                            </button>
                                            <button
                                                onClick={() => openDeleteTaskModal(task)}
                                                style={{
                                                    ...styles.iconButtonStyle,
                                                    backgroundColor: "#FFE5E5",
                                                    transition: "all 0.2s ease",
                                                }}
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
                                    <div style={{ padding: "48px" }}>
                                        {statusFilter !== "all" ?
                                            `No hay tareas eliminadas con estado "${getStatusText(statusFilter as Task["status"])}".` :
                                            "La papelera está vacía"}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para vaciar la papelera */}
            <ConfirmationModal
                isOpen={showEmptyConfirm}
                title="Vaciar la papelera"
                message="Esta acción eliminará permanentemente todas las tareas. Esta acción no se puede deshacer."
                confirmLabel="Vaciar Papelera"
                cancelLabel="Cancelar"
                onConfirm={handleHardDeleteAll}
                onCancel={() => setShowEmptyConfirm(false)}
            />

            {/* Modal para restaurar todas las tareas */}
            <ConfirmationModal
                isOpen={showRestoreConfirm}
                title="Restaurar todas las tareas"
                message="Esta acción restaurará todas las tareas eliminadas."
                confirmLabel="Restaurar Todas"
                cancelLabel="Cancelar"
                onConfirm={handleRestoreAll}
                onCancel={() => setShowRestoreConfirm(false)}
                isSuccessButton={true}
            />

            {/* Modal para restaurar tarea individual */}
            <ConfirmationModal
                isOpen={showRestoreTaskModal}
                title="Restaurar tarea"
                message={`¿Estás seguro de que quieres restaurar la tarea "${selectedTask?.title || ''}"?`}
                confirmLabel="Restaurar"
                cancelLabel="Cancelar"
                onConfirm={handleRestoreTask}
                onCancel={() => {
                    setShowRestoreTaskModal(false);
                    setSelectedTask(null);
                }}
                isSuccessButton={true}
            />

            {/* Modal para eliminar tarea individual */}
            <ConfirmationModal
                isOpen={showDeleteTaskModal}
                title="Eliminar permanentemente"
                message={`¿Estás seguro de que quieres eliminar permanentemente la tarea "${selectedTask?.title || ''}"? Esta acción no se puede deshacer.`}
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                onConfirm={handleDeleteTask}
                onCancel={() => {
                    setShowDeleteTaskModal(false);
                    setSelectedTask(null);
                }}
            />

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

export default TrashList;