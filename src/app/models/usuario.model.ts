export class Usuario {

    nombre: string;
    apellidos: string;
    fechaNacimiento: Date;
    mail: string;
    password: string;
    rpassword: string;
    avatar: string;
    usuario: string;
    cita: string;

    constructor(
        pNombre: string,
        pApellidos: string,
        pFechaNacimiento: Date,
        pMail: string,
        pPassword: string,
        pRPassword: string,
        pAvatar: string,
        pUsuario: string,
        pCita: string
    ) {
        this.nombre = pNombre;
        this.apellidos = pApellidos;
        this.fechaNacimiento = pFechaNacimiento;
        this.mail = pMail;
        this.password = pPassword;
        this.rpassword = pRPassword;
        this.avatar = pAvatar;
        this.usuario = pUsuario;
        this.cita = pCita;
    }
}
