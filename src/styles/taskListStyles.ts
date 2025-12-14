export const containerStyle: React.CSSProperties = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#333",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
};

export const tabsContainerStyle: React.CSSProperties = {
    display: "flex",
    borderBottom: "1px solid #E2E8F0",
    marginBottom: "24px",
};

export const tabButtonStyle: React.CSSProperties = {
    padding: "12px 24px",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#666",
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
    left: "12px",
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

export const tableContainerStyle: React.CSSProperties = {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    backgroundColor: "#fff",
};

export const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
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