import { Moment } from 'moment';
import { IAgent } from 'app/shared/model//agent.model';
import { IDirection } from 'app/shared/model//direction.model';

export interface IAffectation {
    id?: number;
    dateDebut?: Moment;
    dateFin?: Moment;
    agent?: IAgent;
    direction?: IDirection;
}

export class Affectation implements IAffectation {
    constructor(
        public id?: number,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public agent?: IAgent,
        public direction?: IDirection
    ) {}
}
