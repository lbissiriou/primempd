export interface IFonction {
    id?: number;
    titre?: string;
}

export class Fonction implements IFonction {
    constructor(public id?: number, public titre?: string) {}
}
