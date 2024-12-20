import Swal from 'sweetalert2';
import type { SweetAlertOptions } from 'sweetalert2';

//alerts generales para utilizar en cualquier parte del proyecto

/**
 * @param options Configuración personalizada para SweetAlert2.
 */
export const showAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};

/**
 * Alerta de éxito.
 */
export const showSuccessAlert = (message: string) => {
    return Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: message,
        confirmButtonText: 'Entendido',
    });
};

/**
 * Alerta de error.
 */
export const showErrorAlert = (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Cerrar',
    });
};

/**
 * Alerta de confirmación con acciones.
 * @param confirmText Texto del botón de confirmar.
 * @param cancelText Texto del botón de cancelar.
 */
export const showConfirmAlert = (message: string, confirmText = 'Sí', cancelText = 'No') => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    });
};
