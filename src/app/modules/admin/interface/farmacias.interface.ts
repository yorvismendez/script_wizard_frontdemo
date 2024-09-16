export interface ConFarmSucces {
    idfarmacia: number;
    codigo:     number;
    nombre:     string;
    status:     number;
}



export interface FarmInsert {
    nombre: string;
    codigo: number;
    status: number;
}


export interface FarmEdit {
    idfarmacia: number;
    idstatus:   number;
    nombre:     string;
    codigo:     number;
    status:     number;
}


export interface FarmDelete {
    idfarmacia: number;
    nombre:     string;
    codigo:     number;
}




export interface Status {
    idstatus:     number;
    codigo:       number;
    ultmConexion: string;
    status:       number;
    idDestino:    number;
}


