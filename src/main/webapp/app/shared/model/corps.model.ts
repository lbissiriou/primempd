export interface ICorps {
    id?: number;
    libelleCorps?: string;
}

export class Corps implements ICorps {
    constructor(public id?: number, public libelleCorps?: string) {}
}
