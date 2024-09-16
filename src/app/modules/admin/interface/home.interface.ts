export interface GloStatsucces {
    idstatus: number;
    codigo: number;
    ultmConexion: string;
    fechahora: string; //propiedad para formatear la fecha
    esMenor: boolean; //propiedad para validar si la ultima conexion fue hace mas de cierto tiempo
    status: number;
    idDestino: number;
    idFarmacia:  IdFarmacia2;
  }

  export interface IdFarmacia2 {
    idfarmacia: number
    codigo: number
    nombre: string
    status: number
  }