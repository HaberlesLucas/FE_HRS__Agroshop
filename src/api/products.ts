//products.ts
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "./index";

interface Product {
    id_producto: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    stock: number;
    stock_min: number;
    precio_compra?: number;
    incremento?: number;
    id_categoria: number;
    created_at?: string | null;
    updated_at?: string | null;
    categoria: {
        id_categoria: number;
        nombre_categoria: string;
        created_at: string | null;
        updated_at: string | null;
    };
    imagen?: string;
}

export const getProducts = async (): Promise<{ data: Product[] }> => {
    return await fetchGet('productos');
};

export const getProduct = async (id: number): Promise<{ data: Product }> => {
    return await fetchGet(`productos/${id}`);
};

export const createProduct = async (product: FormData): Promise<{ data: Product }> => {
    return await fetchPost('productos', product, true);
};

export const updateProduct = async (id: number, product: FormData): Promise<{ data: Product }> => {
    return await fetchPut(`productos/${id}`, product);
};


export const deleteProduct = async (id: number): Promise<{ success: boolean }> => {
    return await fetchDelete(`productos/${id}`);
};