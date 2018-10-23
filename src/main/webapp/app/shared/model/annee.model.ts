export interface IAnnee {
    id?: number;
    codeAnnee?: number;
}

export class Annee implements IAnnee {
    constructor(public id?: number, public codeAnnee?: number) {}
}
