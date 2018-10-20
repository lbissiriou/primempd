import { Moment } from 'moment';
import { IGrade } from 'app/shared/model//grade.model';
import { IAgent } from 'app/shared/model//agent.model';

export interface IAvancement {
    id?: number;
    dateDebut?: Moment;
    dateFin?: Moment;
    grade?: IGrade;
    agent?: IAgent;
}

export class Avancement implements IAvancement {
    constructor(public id?: number, public dateDebut?: Moment, public dateFin?: Moment, public grade?: IGrade, public agent?: IAgent) {}
}
