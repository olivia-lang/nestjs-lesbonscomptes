const API_URL = 'http://localhost:3000';

async function request(path, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (response.status === 401 && token) {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('session-expiree'));
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || 'Erreur serveur');
    }

    return response.status === 204 ? null : response.json();
}

export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
    delete: (path) => request(path, { method: 'DELETE' }),
};