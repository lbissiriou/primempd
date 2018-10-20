export const enum Typeprime {
    MENSUELLE = 'MENSUELLE',
    TRIMESTRIELLE = 'TRIMESTRIELLE',
    SEMESTRIELLE = 'SEMESTRIELLE',
    ANNUELLE = 'ANNUELLE'
}

export interface IPrime {
    id?: number;
    libellePrime?: string;
    tauxMensuel?: number;
    typePrime?: Typeprime;
}

export class Prime implements IPrime {
    constructor(public id?: number, public libellePrime?: string, public tauxMensuel?: number, public typePrime?: Typeprime) {}
}
