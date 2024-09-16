export interface FarmActivasSucces{
    idfarmacia: number;
    codigo: number;
    nombre: string;
    status: number;
}


export interface ScriptPagSucces {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Content {
    idejecucion: number;
    descripcion: string;
    fecha:       null;
    fechaformat: string;//propiedad para formatear la fecha y hora
    idScript:    IDScript;
    idUsuario:   IDUsuario;
}

export interface IDScript {
    idscript:    number;
    nombre:      string;
    descripcion: string;
    script:      string;
    status:      number;
    nivel:       number;
    database:    number;
    idUsuario:   IDUsuario;
}

export interface IDUsuario {
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

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}


export interface DestinosSucces {
    iddestino:   number;
    status:      number;
    idEjecucion: IDEjecucion;
    idFarmacia:  IDFarmacia;
}

export interface IDEjecucion {
    idejecucion: number;
    descripcion: string;
    fecha:       string;
    idScript:    IDScript;
    idUsuario:   IDUsuario;
}

export interface IDScript {
    idscript:    number;
    nombre:      string;
    descripcion: string;
    script:      string;
    status:      number;
    nivel:       number;
    database:    number;
    idUsuario:   IDUsuario;
}

export interface IDUsuario {
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

export interface IDFarmacia {
    idfarmacia: number;
    codigo:     number;
    nombre:     string;
    status:     number;
}




export interface Ejecucion {
    descripcion: string;
    id_usuario:  number;
    id_script:   number;
}



export interface Destino {
    id_farmacia:  number;
    id_ejecucion: number;
}


export interface EjecucionResponse {
    idejecucion: number;
    descripcion: string;
    fecha:       string;
    idScript:    IDScript;
    idUsuario:   IDUsuario;
}


export interface DestinoResponse {
    iddestino:   number;
    status:      number;
    idEjecucion: IDEjecucion;
    idFarmacia:  IDFarmacia;
}




export interface Role {
    authority:  string;
}


export interface Tokendecod {
    sub:         string;
    authorities: string;
    idusuario:   number;
    exp:         number;
    iat:         number;
}









