export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    fechaNacimiento: string;
    mail: string;
    password: string;
    avatar: string;
    usuario: string;
    cita: string;

    constructor(
        pNombre: string,
        pApellidos: string,
        pFechaNacimiento: string,
        pMail: string,
        pPassword: string,
        pAvatar: string,
        pUsuario: string,
        pCita: string
    ) {
        this.nombre = null;
        this.nombre = pNombre;
        this.apellidos = pApellidos;
        this.fechaNacimiento = pFechaNacimiento;
        this.mail = pMail;
        this.password = pPassword;
        this.avatar = pAvatar;
        this.usuario = pUsuario;
        this.cita = pCita;
    }
}
