import { Moment } from 'moment';
import { IAgent } from 'app/shared/model//agent.model';
import { ICorps } from 'app/shared/model//corps.model';

export interface IChangement {
    id?: number;
    dateDebut?: Moment;
    datefin?: Moment;
    agent?: IAgent;
    corps?: ICorps;
}

export class Changement implements IChangement {
    constructor(public id?: number, public dateDebut?: Moment, public datefin?: Moment, public agent?: IAgent, public corps?: ICorps) {}
}
