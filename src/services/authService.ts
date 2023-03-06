import axiosConfig from "../utils/config/axios.config";

/**
 * Login
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const login = (email:string, password: string) =>{
    let body = {
        email,
        password
    }

    return axiosConfig.post('/auth/login', body)
}

/**
 * Register
 * @param name 
 * @param email 
 * @param password 
 * @param age 
 * @returns 
 */
export const register = (name: string, email:string, password: string, age: number) =>{
    let body = {
        name,
        email,
        password,
        age
    }

    return axiosConfig.post('/auth/register', body)
}