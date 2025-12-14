import React, { useEffect } from "react";
import * as styles from "../styles/taskListStyles"; // Ajusta según tu estructura de estilos

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel: string;
    cancelLabel: string;
    isOpen: boolean;
    isSuccessButton?: boolean; // Nuevo parámetro para determinar el estilo del botón
    title?: string; // Agregar título como opcional
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    message,
    onConfirm,
    onCancel,
    confirmLabel,
    cancelLabel,
    isOpen,
    isSuccessButton = false, // Valor predeterminado en caso de que no se pase
    title,
}) => {
    // Este useEffect se ejecuta cuando el modal se abre (cuando isOpen es true)
    useEffect(() => {
        // Si el modal no está abierto, no hacemos nada
        if (!isOpen) return;

        // Función que cierra el modal cuando se presiona "Escape"
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancel(); // Llama a la función onCancel cuando Escape es presionado
            }
        };

        // Agregar el event listener
        document.addEventListener("keydown", handleEscape);

        // Limpiar el event listener cuando el modal se cierre o el componente se desmonte
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onCancel]);

    // Si el modal no está abierto, no renderizamos nada
    if (!isOpen) return null;

    // Elige el estilo del botón según el parámetro isSuccessButton
    const buttonStyle = isSuccessButton ? styles.successButtonStyle : styles.dangerButtonStyle;

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalStyle}>
                {title && <h3 style={{ margin: "0 0 16px 0", color: "#333" }}>{title}</h3>} {/* Título */}
                <p style={{ marginBottom: "16px", color: "#333" }}>{message}</p> {/* Cuerpo del mensaje */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                    <button
                        onClick={onCancel}
                        style={{ ...styles.secondaryButtonStyle, border: "1px solid #ddd" }}
                    >
                        {cancelLabel}
                    </button>
                    <button onClick={onConfirm} style={buttonStyle}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
