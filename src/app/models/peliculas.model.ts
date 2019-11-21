export class Pelicula {

    id: number;
    imagen: string;
    titulo: string;
    año: string;
    duracion: number;
    direccion: string;
    reparto: string;
    sinopsis: string;
    valoraciones: [];


    constructor(
        pImagen: string, pTitulo: string, pAño: string, pNumber: number, pDireccion: string, pReparto: string, pSinopsis: string,
    ) {
        this.id = null;
        this.imagen = pImagen;
        this.titulo = pTitulo;
        this.año = pAño;
        this.duracion = pNumber;
        this.direccion = pDireccion;
        this.reparto = pReparto;
        this.sinopsis = pSinopsis;
        this.valoraciones = null;
    }
}