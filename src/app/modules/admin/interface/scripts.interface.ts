export interface ScriptSucces {
    idscript: number
    nombre: string
    descripcion: string
    script: string
    status: number
    nivel: number
    database: number
    idUsuario: IdUsuario
  }
  
  export interface IdUsuario {
    iduser: number
    username: string
    name: string
    enabled: boolean
    rolesList: RolesList[]
    admin: boolean
  }
  
  export interface RolesList {
    idrol: number
    name: string
  }


  export interface ScriptIn {
    nombre: string
    descripcion: string
    script: string
    status: number
    nivel: number
    database: number
    id_usuario: number
  }


  export interface ScriptEdi {
    idscript: number
    nombre: string
    descripcion: string
    script: string
    status: number
    nivel: number
    database: number
    id_usuario: number
  }