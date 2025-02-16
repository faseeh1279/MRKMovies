export interface registerData {
    username: string,
    email: string, 
    password: string,
    password2: string
}

export interface loginData { 
    username: string, 
    password: string 
}

export interface Token { 
    access_token: string, 
    refresh_token: string 
}