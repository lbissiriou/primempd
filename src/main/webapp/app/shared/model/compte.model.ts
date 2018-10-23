import { IBanque } from 'app/shared/model//banque.model';
import { IAgent } from 'app/shared/model//agent.model';

export interface ICompte {
    id?: number;
    numeroCompte?: string;
    banque?: IBanque;
    agent?: IAgent;
}

export class Compte implements ICompte {
    constructor(public id?: number, public numeroCompte?: string, public banque?: IBanque, public agent?: IAgent) {}
}
