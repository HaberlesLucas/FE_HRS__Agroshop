//index.ts
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    // console.log('Token obtenido de localStorage:', token);
    return token;
};


export const fetchGet = async (endpoint: string) => {
    const token = getAuthToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const response = await fetch(`${API_URL}${endpoint}`, { headers });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    // console.log('Respuesta de la API:', data);
    return data;
};


export const fetchPost = async (
    endpoint: string,
    data: any,
    includeAuth: boolean = true
) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (includeAuth && getAuthToken()) {
        headers['Authorization'] = `Bearer ${getAuthToken()}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


export const fetchPut = async (endpoint: string, data: any) => {
    if (typeof endpoint !== 'string') {
        throw new Error('El endpoint debe ser una cadena válida');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


export const fetchDelete = async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export { API_URL };