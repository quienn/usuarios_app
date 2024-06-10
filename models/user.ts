const BASE_URL = "http://192.168.1.70:8080";

export type User = {
    id?: number;
    nickname: string;
    email: string;
    password: string;
};

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
}

export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return response.json();
}

export const createUser = async (user: User): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response.json();
}

export const updateUser = async (id: number, user: User): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response.json();
}

export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE'
    });
}
