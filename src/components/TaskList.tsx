import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import SearchIcon from "../assets/search.svg";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/trash.svg";
import PlusIcon from "../assets/plus.svg";

// Importar los modales ya creados
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);

    const refreshTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskService.getTasks();
            // Simular pequeño delay
            setTimeout(() => {
                setTasks(data.filter((t): t is Task => t !== undefined && t !== null));
                setLoading(false);
            }, 400);
        } catch {
            setError("No se pudieron cargar las tareas.");
            setLoading(false);
        }
    };

    // Llamar a refreshTasks al montar el componente
    useEffect(() => {
        refreshTasks();
    }, []);

    const filteredTasks = tasks
        .filter((t): t is Task => t !== undefined && t !== null)
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

    const formatDate = (iso: string) => new Date(iso).toLocaleString();

    const getStatusColor = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "#fbc02d";
            case "in_progress": return "#1976d2";
            case "completed": return "#4caf50";
            default: return "#555";
        }
    };

    const SkeletonRow = () => (
        <tr>
            {Array.from({ length: 5 }).map((_, i) => <td key={i}><div className="shimmer-box"></div></td>)}
        </tr>
    );

    return (
        <div style={{ textAlign: "left", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Barra de búsqueda y botón crear */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                    <img src={SearchIcon} alt="Buscar" style={searchIconStyle} />
                    <input
                        type="text"
                        placeholder="Buscar tarea por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        ...buttonGreen,
                        marginLeft: "10px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                    }}
                    title="Crear nueva tarea"
                >
                    <img src={PlusIcon} alt="Nuevo" style={{ width: "18px", height: "18px" }} />
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Tabla */}
            <div style={{ border: "1px solid #e0e0e0", borderRadius: "7px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={headerCellStyle}>Título</th>
                            <th style={headerCellStyle}>Descripción</th>
                            <th style={headerCellStyle}>Estado</th>
                            <th style={headerCellStyle}>Creado el</th>
                            <th style={headerCellStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            : filteredTasks.length > 0
                                ? filteredTasks.map((t) => (
                                    <tr key={t.id} style={rowStyle}>
                                        <td style={cellStyle}>{t.title}</td>
                                        <td style={{ ...cellStyle, color: "#555" }}>{t.description}</td>
                                        <td style={cellStyle}>
                                            <select
                                                value={t.status}
                                                onChange={async (e) => {
                                                    const newStatus = e.target.value as Task["status"];
                                                    try {
                                                        await taskService.updateTask(t.id, { ...t, status: newStatus });
                                                        await refreshTasks();
                                                    } catch {
                                                        alert("No se pudo actualizar el estado.");
                                                    }
                                                }}
                                                style={{ backgroundColor: getStatusColor(t.status), color: "#fff", padding: "4px 8px", borderRadius: "4px", border: "none", cursor: "pointer" }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>


                                        <td style={cellStyle}>{formatDate(t.createdAt)}</td>
                                        <td style={cellStyle}>
                                            <img src={EditIcon} alt="Editar" title="Editar" style={iconStyle} onClick={() => setEditingTask(t)} />
                                            <img src={DeleteIcon} alt="Eliminar" title="Eliminar" style={iconStyle} onClick={() => setDeletingTask(t)} />
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan={5} style={cellStyle}>No se encontraron tareas.</td></tr>
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal crear */}
            {showCreateModal && (
                <CreateTaskModal
                    onClose={() => setShowCreateModal(false)}
                    onTaskCreated={async () => {
                        setShowCreateModal(false);
                        await refreshTasks(); // recarga la lista
                    }}
                />
            )}

            {/* Modal edición */}
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onTaskUpdated={async () => {
                        setEditingTask(null);
                        await refreshTasks(); // recarga la lista
                    }}
                />
            )}

            {/* Modal eliminación */}
            {deletingTask && (
                <DeleteTaskModal
                    task={deletingTask}
                    onClose={() => setDeletingTask(null)}
                    onTaskDeleted={async () => {
                        setDeletingTask(null);
                        await refreshTasks(); // recarga la lista
                    }}
                />
            )}

            <style>{`
        .shimmer-box {
          height: 24px;
          margin: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
};

const headerCellStyle: React.CSSProperties = { textAlign: "left", padding: "12px", fontWeight: 600, fontSize: "14px", color: "#333", backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0" };
const rowStyle: React.CSSProperties = { backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" };
const cellStyle: React.CSSProperties = { padding: "12px", fontSize: "14px" };
const buttonGreen: React.CSSProperties = { padding: "10px 16px", borderRadius: "5px", border: "none", backgroundColor: "#4caf50", color: "#fff", cursor: "pointer" };
const searchIconStyle: React.CSSProperties = { position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", pointerEvents: "none" };
const searchInputStyle: React.CSSProperties = { padding: "10px 10px 10px 36px", fontSize: "16px", width: "100%", borderRadius: "7px", border: "1px solid #ccc", outline: "none", boxSizing: "border-box" };
const iconStyle: React.CSSProperties = { width: "20px", marginRight: "10px", cursor: "pointer" };

export default TaskList;
