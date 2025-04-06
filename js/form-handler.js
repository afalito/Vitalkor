// Manejador del formulario de contacto para Vitalkor
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Validación del formulario antes de enviar
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault(); // Detener envío solo si hay errores
            } else {
                // Mostrar indicador de carga
                contactForm.classList.add('loading');
            }
        });

        // Escuchar por la URL para detectar redirección de Formspree después del envío
        if (window.location.search.includes('submitted=true') || 
            window.location.hash === '#contacto' || 
            window.location.hash.includes('submitted=true')) {
            showSuccessMessage();
        }
    }
    
    // Función de validación del formulario
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        // Limpiar errores previos
        const allErrors = document.querySelectorAll('.error-message');
        allErrors.forEach(error => error.remove());
        
        // Validar nombre
        if (!name.value.trim()) {
            showError(name, 'Por favor ingrese su nombre');
            isValid = false;
        } else {
            removeError(name);
        }
        
        // Validar email
        if (!email.value.trim()) {
            showError(email, 'Por favor ingrese su correo electrónico');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor ingrese un correo electrónico válido');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Validar teléfono (opcional pero si se ingresa debe ser válido)
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'Por favor ingrese un número de teléfono válido');
            isValid = false;
        } else {
            removeError(phone);
        }
        
        // Validar mensaje
        if (!message.value.trim()) {
            showError(message, 'Por favor ingrese su mensaje');
            isValid = false;
        } else {
            removeError(message);
        }
        
        return isValid;
    }
    
    // Función para mostrar errores
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        formControl.appendChild(errorElement);
        formControl.className = 'form-control error';
        input.focus();
    }
    
    // Función para eliminar errores
    function removeError(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control';
    }
    
    // Validación de email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Validación de teléfono
    function isValidPhone(phone) {
        // Acepta formatos comunes de teléfono colombiano
        const re = /^(\+?57)?[ -]?(\d{10}|\d{3}[ -]?\d{3}[ -]?\d{4})$/;
        return re.test(phone);
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        // Limpiar el formulario
        if (contactForm) {
            contactForm.reset();
            contactForm.classList.remove('loading');
        }
        
        try {
            // Intentar usar el sistema de notificaciones flotantes
            window.notifications.success('¡Mensaje enviado con éxito! Te contactaremos pronto.', 4000);
        } catch (err) {
            // Fallback: mostrar mensaje inline
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Te contactaremos pronto.';
            
            // Insertar al comienzo del formulario
            if (contactForm) {
                contactForm.insertAdjacentElement('beforebegin', successMessage);
            } else {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                    contactSection.querySelector('.section-title').insertAdjacentElement('afterend', successMessage);
                }
            }
            
            // Eliminar mensaje después de 4 segundos
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 300);
            }, 4000);
        }
    }
});
