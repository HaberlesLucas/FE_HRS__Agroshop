import { fetchGet, fetchPost, fetchPut, fetchDelete } from "./index";

interface Product {
    id_producto: Product;
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    id_categoria: number;
    stock: number;
    stock_min: number;
}

export const getProducts = async (): Promise<{ data: Product[] }> => {
    return await fetchGet('productos');
};

export const getProduct = async (id: number): Promise<{ data: Product }> => {
    return await fetchGet(`productos/${id}`);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ data: Product }> => {
    return await fetchPost('productos', product);
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<{ data: Product }> => {
    return await fetchPut(`productos/${id}`, product);
};


export const deleteProduct = async (id: number): Promise<{ success: boolean }> => {
    return await fetchDelete(`productos/${id}`);
};