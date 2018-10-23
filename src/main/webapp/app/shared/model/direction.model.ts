export interface IDirection {
    id?: number;
    sigle?: string;
    libelleDirection?: string;
}

export class Direction implements IDirection {
    constructor(public id?: number, public sigle?: string, public libelleDirection?: string) {}
}
