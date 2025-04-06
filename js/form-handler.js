// Este archivo maneja la validación del formulario de contacto para Netlify
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
    
    // Verificar si se redirigió después de envío exitoso
    if (window.location.search.includes('success=true') || 
        window.location.hash.includes('success=true')) {
        
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(function() {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s';
                setTimeout(function() {
                    successMessage.style.display = 'none';
                    successMessage.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    }
});
