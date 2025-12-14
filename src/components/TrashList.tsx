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
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false); // Nuevo estado

    const refreshDeletedTasks = async () => {
        setLoading(true);
        try {
            const response = await taskService.getDeletedTasks();
            if (response.success && response.tasks) {
                const validTasks = response.tasks.filter((t): t is Task => t !== undefined && t !== null);
                setDeletedTasks(validTasks);
            }
        } catch (error) {
            console.error("Error loading deleted tasks:", error);
        } finally {
            setLoading(false);
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

    const handleRestore = async (id: string) => {
        const res = await taskService.restoreTaskById(id);
        if (res.success) {
            setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
            if (onRefresh) onRefresh();
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
            if (onRefresh) onRefresh();
        }
        setShowRestoreConfirm(false); // Cerrar el modal después de restaurar
    };

    const handleHardDeleteAll = async () => {
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
                            onClick={() => setShowRestoreConfirm(true)} // Mostrar modal de confirmación
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
                            <th style={styles.headerCellStyle}>Acciones</th>
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
                title="¿Vaciar la papelera? " // Título del modal
                message="Esta acción eliminará permanentemente todas las tareas. Esta acción no se puede deshacer." // Cuerpo del mensaje
                confirmLabel="Vaciar Papelera"
                cancelLabel="Cancelar"
                onConfirm={handleHardDeleteAll}
                onCancel={() => setShowEmptyConfirm(false)}
            />

            {/* Modal para restaurar todas las tareas */}
            <ConfirmationModal
                isOpen={showRestoreConfirm}
                title="¿Restaurar todas las tareas?" // Título del modal
                message=" Esta acción restaurará todas las tareas eliminadas." // Cuerpo del mensaje
                confirmLabel="Restaurar Todas"
                cancelLabel="Cancelar"
                onConfirm={handleRestoreAll}
                onCancel={() => setShowRestoreConfirm(false)}
                isSuccessButton={true}
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
