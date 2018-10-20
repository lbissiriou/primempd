export interface ITrimestre {
    id?: number;
    codeTrimestre?: number;
    trimestre?: string;
}

export class Trimestre implements ITrimestre {
    constructor(public id?: number, public codeTrimestre?: number, public trimestre?: string) {}
}
