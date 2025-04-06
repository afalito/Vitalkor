// Sistema de notificaciones para Vitalkor

/**
 * Muestra una notificación tipo toast
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de notificación ('success', 'error')
 * @param {number} duration - Duración en milisegundos
 */
function showToast(message, type = 'success', duration = 5000) {
    // Eliminar notificaciones existentes
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => {
        document.body.removeChild(toast);
    });
    
    // Crear el elemento de notificación
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    // Definir el icono según el tipo
    let icon = 'check-circle';
    if (type === 'error') {
        icon = 'exclamation-circle';
    }
    
    // Crear estructura interna
    toast.innerHTML = `
        <div class="icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="content">${message}</div>
        <button class="close-btn">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Añadir al DOM
    document.body.appendChild(toast);
    
    // Configurar el botón de cierre
    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        closeToast(toast);
    });
    
    // Auto-cerrar después de la duración especificada
    setTimeout(() => {
        closeToast(toast);
    }, duration);
}

/**
 * Cierra una notificación con animación
 * @param {HTMLElement} toast - El elemento de notificación a cerrar
 */
function closeToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Exportar funciones
window.notifications = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration)
};