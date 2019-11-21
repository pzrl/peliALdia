export class Cine {

    id: number;
    nombre: string;
    marca: string;
    direccion: string;
    telefono: string;
    peliculas: [];


    constructor(
        pNombre: string,
        pMarca: string,
        pDireccion: string,
        pTelefono: string,
        pPeliculas: [],
    ) {
        this.id = null;
        this.nombre = pNombre;
        this.marca = pMarca;
        this.direccion = pDireccion;
        this.telefono = pTelefono;
        this.peliculas = pPeliculas;
    }
}