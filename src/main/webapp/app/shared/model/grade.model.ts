export interface IGrade {
    id?: number;
    grade?: string;
    indiceBase?: number;
}

export class Grade implements IGrade {
    constructor(public id?: number, public grade?: string, public indiceBase?: number) {}
}
