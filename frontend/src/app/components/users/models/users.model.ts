export interface RegisterData {
    username: string | null,
    email: string | null, 
    password: string | null,
    password2: string | null
}

export interface loginData { 
    username: string, 
    password: string 
}

export interface Token { 
    access: string, 
    refresh: string 
}