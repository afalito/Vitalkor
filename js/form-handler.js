// Manejador del formulario de contacto para Vitalkor
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación del formulario
            if (validateForm()) {
                // Simulación de envío (en producción se reemplazaría con el envío real)
                sendFormData();
            }
        });
    }
    
    // Función de validación del formulario
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
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
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        formControl.className = 'form-control error';
    }
    
    // Función para eliminar errores
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
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
    
    // Función para enviar los datos del formulario
    function sendFormData() {
        const formData = new FormData(contactForm);
        contactForm.classList.add('loading');
        
        // Enviar datos al servidor mediante fetch
        fetch('send-email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            contactForm.classList.remove('loading');
            
            if (data.success) {
                // Mostrar mensaje de éxito
                contactForm.reset();
                
                // Mostrar mensaje de éxito inline y con el sistema de notificaciones
                try {
                    // Intentar usar el sistema de notificaciones flotantes
                    window.notifications.success('¡Mensaje enviado con éxito!', 4000);
                } catch (err) {
                    // Fallback: mostrar mensaje inline con el nuevo estilo
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle" style="margin-right: 8px; font-size: 14px;"></i>Mensaje enviado con éxito';
                    
                    // Insertar al comienzo del formulario
                    contactForm.parentNode.insertBefore(successMessage, contactForm);
                    
                    // Eliminar mensaje después de 4 segundos
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    }, 4000);
                }
            } else {
                // Mostrar errores usando el nuevo sistema de notificaciones
                if (data.errors) {
                    // Si hay múltiples errores, mostrar mensaje con el primer error
                    const errorMsg = "Por favor corrige los siguientes campos: " + data.errors[0];
                    window.notifications.error(errorMsg, 5000);
                } else {
                    // Mostrar mensaje de error general
                    const errorMsg = data.message || 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.';
                    window.notifications.error(errorMsg, 5000);
                }
            }
        })
        .catch(error => {
            contactForm.classList.remove('loading');
            console.error('Error:', error);
            
            // Mostrar error de conexión con el nuevo sistema de notificaciones
            window.notifications.error('Error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo.', 5000);
        });
    }
});
