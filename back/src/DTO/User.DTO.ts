export interface UserRegisterDTO {
    name: string;
    email: string;
    nDni: number;
    username: string;
    password: string;
    birthdate: Date;
}

export interface UserRegisterResponse {
    name: string;  
    email: string;
}

export interface UserLoginDTO {
    username: string;
    password: string;
}