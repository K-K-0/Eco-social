import API from "../lib/axios";

export const registerUser = async (email: string, password: string) => {
    return API.post('/auth/register', { email, password })
}

export const loginUser = async (email: string, password: string) => {
    return API.post('/auth/login', { email, password })
}

export const getMe = async () => {
    return API.get('/auth/me')
}

export const logoutUser = async () => {
    return API.post('/auth/logout')
}