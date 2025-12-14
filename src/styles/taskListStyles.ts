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

// Estilos para páginas de autenticación
export const authContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  overflow: "hidden"
};

export const authCardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "440px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  border: "1px solid #E2E8F0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

export const authHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "8px",
};

export const authTitleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 600,
  color: "#2D3748",
  margin: "0 0 8px 0",
};

export const authSubtitleStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#718096",
  margin: 0,
};

export const authFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export const authInputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

export const authLabelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#4A5568",
  marginBottom: "4px",
};

export const authInputStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "14px",
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #E2E8F0",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
  backgroundColor: "#fff",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const authInputIconStyle: React.CSSProperties = {
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "16px",
  height: "16px",
  color: "#A0AEC0",
  pointerEvents: "none",
};

export const authInputWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

export const authButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  width: "100%",
  padding: "14px 24px",
  fontSize: "15px",
  fontWeight: 500,
  borderRadius: "8px",
  marginTop: "8px",
};

export const authDividerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  margin: "16px 0",
  color: "#A0AEC0",
  fontSize: "13px",
};

export const authDividerLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "#E2E8F0",
};

export const authDividerTextStyle: React.CSSProperties = {
  padding: "0 16px",
  color: "#718096",
  fontSize: "13px",
};

export const authFooterStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "8px",
  fontSize: "14px",
  color: "#718096",
};

export const authLinkStyle: React.CSSProperties = {
  color: "#4CAF50",
  fontWeight: 500,
  cursor: "pointer",
  textDecoration: "none",
  transition: "color 0.2s",
};

export const errorMessageStyle: React.CSSProperties = {
  ...errorStyle,
  marginTop: "16px",
  marginBottom: 0,
  padding: "10px 14px",
  fontSize: "13px",
};

export const successMessageStyle: React.CSSProperties = {
  ...errorMessageStyle,
  backgroundColor: "#E8F5E9",
  color: "#2E7D32",
  border: "1px solid #C8E6C9",
};

// Estilos para página 404
export const notFoundContainerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  backgroundColor: "#F7FAFC",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const notFoundCardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  border: "1px solid #E2E8F0",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  padding: "48px 40px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
};

export const notFoundIconContainer: React.CSSProperties = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  backgroundColor: "#F0F7FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "8px",
  border: "1px solid #E2E8F0",
};

export const notFoundTitleStyle: React.CSSProperties = {
  fontSize: "48px",
  fontWeight: 700,
  color: "#2D3748",
  margin: "0 0 8px 0",
  lineHeight: 1,
};

export const notFoundSubtitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 500,
  color: "#4A5568",
  margin: "0 0 16px 0",
};

export const notFoundDescriptionStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "#718096",
  margin: "0 0 32px 0",
  lineHeight: 1.6,
  maxWidth: "380px",
};

export const notFoundErrorCodeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 16px",
  backgroundColor: "#F7FAFC",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#4A5568",
  border: "1px solid #E2E8F0",
  marginBottom: "24px",
  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
};

export const notFoundActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
};

export const notFoundSearchStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "320px",
  marginBottom: "24px",
};

export const notFoundSearchInputStyle: React.CSSProperties = {
  ...searchInputStyle,
  padding: "12px 16px 12px 44px",
  fontSize: "15px",
  borderColor: "#CBD5E0",
};

export const notFoundSearchIconStyle: React.CSSProperties = {
  ...searchIconStyle,
  left: "16px",
  width: "18px",
  height: "18px",
  color: "#718096",
};

export const notFoundLinksContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "24px",
};

export const notFoundLinkStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#4CAF50",
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "color 0.2s",
};

export const notFoundBackgroundPattern: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  opacity: 0.1,
  zIndex: 0,
};