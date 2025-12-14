import { useEffect, useRef } from "react";
import type { Task } from "../types/task";

interface StatusDropdownProps {
    taskId: string;
    taskStatus: Task["status"];
    position: { top: number; left: number } | null;
    onClose: () => void;
    onStatusChange: (taskId: string, newStatus: Task["status"]) => Promise<void>;
    getStatusColor: (status: Task["status"]) => string;
    getStatusTextColor: (status: Task["status"]) => string;
    getStatusText: (status: Task["status"]) => string;
}

const StatusDropdown = ({
    taskId,
    taskStatus,
    position,
    onClose,
    onStatusChange,
    getStatusColor,
    getStatusTextColor,
    getStatusText,
}: StatusDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!position) return null;

    return (
        <div
            ref={dropdownRef}
            style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                zIndex: 9999,
                minWidth: "160px",
                animation: "fadeIn 0.2s ease-out"
            }}
        >
            {["pending", "in_progress", "completed"].map((option) => (
                <button
                    key={option}
                    onClick={async () => {
                        await onStatusChange(taskId, option as Task["status"]);
                        onClose();
                    }}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "none",
                        backgroundColor: taskStatus === option 
                            ? `${getStatusColor(option as Task["status"])}15` 
                            : "transparent",
                        color: getStatusTextColor(option as Task["status"]),
                        fontSize: "14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "background-color 0.2s",
                        borderBottom: "1px solid #F1F5F9",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7FAFC"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 
                        taskStatus === option 
                            ? `${getStatusColor(option as Task["status"])}15` 
                            : "transparent"}
                >
                    <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: getStatusColor(option as Task["status"])
                    }} />
                    <span style={{ flex: 1 }}>{getStatusText(option as Task["status"])}</span>
                    {taskStatus === option && (
                        <span style={{ color: getStatusColor(option as Task["status"]), fontWeight: "bold" }}>
                            ✓
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default StatusDropdown;