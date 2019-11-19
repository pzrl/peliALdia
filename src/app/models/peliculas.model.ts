export class Pelicula {

    titulo: string;
    año: string;
    direccion: string;
    reparto: string;
    sinopsis: string;


    constructor(
        pTitulo: string, pAño: string, pDireccion: string, pReparto: string, pSinopsis: string,
    ) {
        this.titulo = pTitulo;
        this.año = pAño;
        this.direccion = pDireccion;
        this.reparto = pReparto;
        this.sinopsis = pSinopsis;
    }
}