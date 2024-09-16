export interface Login {
    username: string,
    password: string
}


export interface ResponseSuccess {
    token:    string;
    username: string;
}


export interface ResponseError {
    error: string;
}


export interface User {
    iduser:    number;
    username:  string;
    name:      string;
    enabled:   boolean;
    rolesList: RolesList[];
    admin:     boolean;
}

export interface RolesList {
    idrol: number;
    name:  string;
}

