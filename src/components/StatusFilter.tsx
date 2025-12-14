import { useEffect, useRef, useState } from "react";
import FilterIcon from "../assets/filter.svg";
import type { Task } from "../types/task";
import * as styles from "../styles/taskListStyles";

interface StatusFilterProps {
    statusFilter: Task["status"] | "all";
    onStatusFilterChange: (value: Task["status"] | "all") => void;
    getStatusColor?: (status: Task["status"]) => string;
    getStatusTextColor?: (status: Task["status"]) => string;
    getStatusText?: (status: Task["status"]) => string;
}

const StatusFilter = ({
    statusFilter,
    onStatusFilterChange,
    getStatusColor = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "#F59E0B";
            case "in_progress": return "#3B82F6";
            case "completed": return "#10B981";
            default: return "#6B7280";
        }
    },
    getStatusTextColor = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "#92400E";
            case "in_progress": return "#1E40AF";
            case "completed": return "#065F46";
            default: return "#374151";
        }
    },
    getStatusText = (status: Task["status"]) => {
        switch (status) {
            case "pending": return "Pending";
            case "in_progress": return "In Progress";
            case "completed": return "Completed";
            default: return "Unknown";
        }
    }
}: StatusFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: Task["status"] | "all") => {
        onStatusFilterChange(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Funciones auxiliares para el estado "all"
    const getAllColor = () => "#6B7280";
    const getAllTextColor = () => "#374151";
    const getAllText = () => "Todos los estados";

    // Obtener texto del filtro actual
    const getCurrentFilterText = () => {
        if (statusFilter === "all") return getAllText();
        return getStatusText(statusFilter);
    };

    return (
        <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
            <button
                onClick={toggleDropdown}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    backgroundColor: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    color: statusFilter === "all" ? getAllTextColor() : getStatusTextColor(statusFilter),
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",

                    justifyContent: "space-between"
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={FilterIcon} alt="Filtrar" style={{...styles.filterIconStyle}} />
                    <span style={{marginLeft: "22px"}}>{getCurrentFilterText()}</span>
                </div>
            </button>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                        zIndex: 9999,
                        minWidth: "180px",
                        animation: "fadeIn 0.2s ease-out"
                    }}
                >
                    {/* Opción "Todos" */}
                    <button
                        onClick={() => handleOptionClick("all")}
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            border: "none",
                            backgroundColor: statusFilter === "all"
                                ? `${getAllColor()}15`
                                : "transparent",
                            color: getAllTextColor(),
                            fontSize: "14px",
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "background-color 0.2s",
                            borderBottom: "1px solid #F1F5F9",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7FAFC"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor =
                            statusFilter === "all"
                                ? `${getAllColor()}15`
                                : "transparent"}
                    >
                        <div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: getAllColor()
                        }} />
                        <span style={{ flex: 1 }}>{getAllText()}</span>
                        {statusFilter === "all" && (
                            <span style={{ color: getAllColor(), fontWeight: "bold" }}>
                                ✓
                            </span>
                        )}
                    </button>

                    {/* Opciones de estado específicas */}
                    {(["pending", "in_progress", "completed"] as Task["status"][]).map((option) => (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                border: "none",
                                backgroundColor: statusFilter === option
                                    ? `${getStatusColor(option)}15`
                                    : "transparent",
                                color: getStatusTextColor(option),
                                fontSize: "14px",
                                textAlign: "left",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "background-color 0.2s",
                                borderBottom: option === "completed" ? "none" : "1px solid #F1F5F9",
                                ...(option === "completed" && {
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px"
                                })
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7FAFC"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor =
                                statusFilter === option
                                    ? `${getStatusColor(option)}15`
                                    : "transparent"}
                        >
                            <div style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: getStatusColor(option)
                            }} />
                            <span style={{ flex: 1 }}>{getStatusText(option)}</span>
                            {statusFilter === option && (
                                <span style={{ color: getStatusColor(option), fontWeight: "bold" }}>
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Estilos para la animación */}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-8px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default StatusFilter;