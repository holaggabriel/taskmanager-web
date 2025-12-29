import React from "react";
import * as styles from "../../styles/taskListStyles";

interface TabsProps {
    activeTab: "active" | "deleted";
    onTabChange: (tab: "active" | "deleted") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div style={styles.tabsContainerStyle}>
            <button
                onClick={() => onTabChange("active")}
                style={{
                    ...styles.tabButtonStyle,
                    borderColor: activeTab === "active" ? "#4CAF50" : "transparent",
                    color: activeTab === "active" ? "#4CAF50" : "#666",
                }}
            >
                Tareas Activas
            </button>
            <button
                onClick={() => onTabChange("deleted")}
                style={{
                    ...styles.tabButtonStyle,
                    borderColor: activeTab === "deleted" ? "#F44336" : "transparent",
                    color: activeTab === "deleted" ? "#F44336" : "#666",
                }}
            >
                Tareas Eliminadas
            </button>
        </div>
    );
};

export default Tabs;
