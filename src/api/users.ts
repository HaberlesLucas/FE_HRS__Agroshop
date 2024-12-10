import { fetchPost } from "./index";

//login
export const login = async (data: {
    email?: string;
    usuario?: string;
    password: string
}) => {
    return await fetchPost('auth/login', data);
};

//registro
export const registerUser = async (data: {
    nombre: string;
    apellido: string;
    email: string;
    usuario: string;
    password: string;
    password_confirmation: string;
}) => {
    // console.log('Datos enviados al backend (registerUser):', data); //eliminaaaaaarr
    return await fetchPost('users', data, false); //no incluyo el token
};