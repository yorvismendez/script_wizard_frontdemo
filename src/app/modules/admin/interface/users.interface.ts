export interface ConUseActSucces {
    iduser:    number;
    username:  string;
    name:      string;
    enabled:   boolean;
    rolesList: RolesList[];
}

export interface RolesList {
    idrol: number;
    name:  string;
}



export interface UserInsert {
    username: string;
    name:     string;
    password: string;
    enabled:  boolean;
    admin:    boolean;
}




export interface UserEdit {
    iduser:   number;
    username: string;
    name:     string;
    password: string;
    enabled:  boolean;
    admin:    boolean;
}
