
import { fetchPost, fetchGet } from './index';

export const addProductsToCart = async (productos: { id_producto: number; cantidad: number }[]) => {
    const datos = { productos };
    console.log(datos)
    return await fetchPost('carrito/detalle', datos);
};

export const getCartDetails = async (id_carrito_cb: number) => {
    return await fetchGet(`/carrito/${id_carrito_cb}`);
};
