

import { fetchGet } from "./index";

interface Categoria {
    id_categoria: number;
    nombre_categoria: string;
}

export const getCategorias = async (): Promise<{ data: Categoria[] }> => {
    return await fetchGet('productos/categorias');
};