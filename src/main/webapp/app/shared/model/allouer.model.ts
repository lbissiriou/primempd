import { IAgent } from 'app/shared/model//agent.model';
import { IPrime } from 'app/shared/model//prime.model';
import { IAnnee } from 'app/shared/model//annee.model';
import { ITrimestre } from 'app/shared/model//trimestre.model';

export interface IAllouer {
    id?: number;
    note?: number;
    nombreJours?: number;
    montant?: number;
    agent?: IAgent;
    prime?: IPrime;
    annee?: IAnnee;
    trimestre?: ITrimestre;
}

export class Allouer implements IAllouer {
    constructor(
        public id?: number,
        public note?: number,
        public nombreJours?: number,
        public montant?: number,
        public agent?: IAgent,
        public prime?: IPrime,
        public annee?: IAnnee,
        public trimestre?: ITrimestre
    ) {}
}
