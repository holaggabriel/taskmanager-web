export const containerStyle: React.CSSProperties = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#333",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
};

export const controlsContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
    alignItems: "center",
};

export const searchContainerStyle: React.CSSProperties = {
    position: "relative",
    flex: 1,
    minWidth: "200px",
};

export const searchIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "16px",
    height: "16px",
    opacity: 0.5,
};

export const searchInputStyle: React.CSSProperties = {
    padding: "10px 12px 10px 36px",
    fontSize: "14px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
};

export const filterContainerStyle: React.CSSProperties = {
    position: "relative",
    minWidth: "180px",
};

export const filterIconStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "14px",
    height: "14px",
    opacity: 0.5,
    zIndex: 1,
};

export const filterSelectStyle: React.CSSProperties = {
    padding: "10px 12px 10px 36px",
    fontSize: "14px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    cursor: "pointer",
    appearance: "none",
    transition: "border-color 0.2s",
};

export const actionsContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
};

export const primaryButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
};

export const secondaryButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    backgroundColor: "#fff",
    color: "#4A5568",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
};

export const dangerButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#F44336",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
};

export const successButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50", // Verde
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
};

export const iconButtonStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#F7FAFC",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    padding: "0",
};

export const errorStyle: React.CSSProperties = {
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#FEEBEE",
    color: "#D32F2F",
    marginBottom: "16px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
};

export const headerContainer: React.CSSProperties = {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 15px",
    marginBottom: "30px",
    flexWrap: "wrap",
};

export const tableContainerStyle: React.CSSProperties = {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    overflow: "auto",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    backgroundColor: "#fff",
    maxHeight: "calc(100vh - 200px)", 
};

export const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px", 
    fontSize: "14px",
};

export const headerCellStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "16px",
    fontWeight: 600,
    color: "#4A5568",
    backgroundColor: "#F7FAFC",
    borderBottom: "1px solid #E2E8F0",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
};

export const rowStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #F1F5F9",
    transition: "background-color 0.2s",
};

export const cellStyle: React.CSSProperties = {
    padding: "16px",
    fontSize: "14px",
    color: "#2D3748",
    minWidth: "120px"
};

export const bulkActionsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #E2E8F0",
};

export const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
};

export const modalStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

export const tabsContainer: React.CSSProperties = {
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
    gap: "8px",
};

// Estilos base
export const tabButton: React.CSSProperties = {
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "6px 6px 0 0",
    transition: "all 0.2s ease",
    background: "transparent",
};

// Estilos para los tabs activos
export const activeTabStyles: React.CSSProperties = {
    backgroundColor: "#f0f7ff",
    borderBottom: "2px solid #1976d2",
    color: "#1976d2",
    fontWeight: 600,
};

// Estilos para los tabs inactivos
export const inactiveTabStyles: React.CSSProperties = {
    backgroundColor: "transparent",
    borderBottom: "2px solid transparent",
    color: "#666",
    fontWeight: 400,
};

// Estilos para el tab de tareas eliminadas (activo)
export const deletedTabActiveStyles: React.CSSProperties = {
    backgroundColor: "#fff5f5",
    borderBottom: "2px solid #dc3545",
    color: "#dc3545",
    fontWeight: 600,
};

// Estilos para el tab de tareas eliminadas (inactivo)
export const deletedTabInactiveStyles: React.CSSProperties = {
    backgroundColor: "transparent",
    borderBottom: "2px solid transparent",
    color: "#666",
    fontWeight: 400,
};

// Estilos adaptados al estilo de taskListStyles
export const modalContentStyle: React.CSSProperties = {
    ...modalStyle,
    maxWidth: "500px",
};

export const modalHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
};

export const modalTitleStyle: React.CSSProperties = {
    margin: "0",
    color: "#333",
    fontSize: "18px",
    fontWeight: 600
};

export const inputStyle: React.CSSProperties = {
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

export const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    marginBottom: "20px",
    lineHeight: "1.5",
};

export const modalButtonsContainer: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
};

// Nuevos estilos para modo visualización
export const viewModeContentStyle: React.CSSProperties = {
    padding: "8px 0",
};

export const viewFieldStyle: React.CSSProperties = {
    marginBottom: "16px",
};

export const viewLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
};

export const viewValueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#334155",
    padding: "8px 12px",
    backgroundColor: "#f8fafc",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    minHeight: "20px",
};

export const placeholderStyle: React.CSSProperties = {
    color: "#94a3b8",
    fontStyle: "italic",
};