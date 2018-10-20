import { Moment } from 'moment';
import { IFonction } from 'app/shared/model//fonction.model';
import { ICompte } from 'app/shared/model//compte.model';
import { IDirection } from 'app/shared/model//direction.model';
import { IGrade } from 'app/shared/model//grade.model';
import { ICorps } from 'app/shared/model//corps.model';

export const enum Situationmatrimoniale {
    MARIE = 'MARIE',
    CELIBATAIRE = 'CELIBATAIRE'
}

export const enum Statut {
    ACE = 'ACE',
    APE = 'APE',
    CDD = 'CDD',
    OCCASIONNEL = 'OCCASIONNEL',
    CONVENTIONNE = 'CONVENTIONNE'
}

export interface IAgent {
    id?: number;
    matricule?: number;
    nom?: string;
    prenoms?: string;
    dateNaiss?: Moment;
    lieuNaiss?: string;
    contact?: string;
    email?: string;
    adresse?: string;
    datePriseServ?: Moment;
    situationMatrim?: Situationmatrimoniale;
    nombreEnfts?: number;
    statut?: Statut;
    fonctionActuelle?: IFonction;
    compteactuel?: ICompte;
    directionactuelle?: IDirection;
    gradeactuel?: IGrade;
    corpsactuel?: ICorps;
    comptes?: ICompte[];
}

export class Agent implements IAgent {
    constructor(
        public id?: number,
        public matricule?: number,
        public nom?: string,
        public prenoms?: string,
        public dateNaiss?: Moment,
        public lieuNaiss?: string,
        public contact?: string,
        public email?: string,
        public adresse?: string,
        public datePriseServ?: Moment,
        public situationMatrim?: Situationmatrimoniale,
        public nombreEnfts?: number,
        public statut?: Statut,
        public fonctionActuelle?: IFonction,
        public compteactuel?: ICompte,
        public directionactuelle?: IDirection,
        public gradeactuel?: IGrade,
        public corpsactuel?: ICorps,
        public comptes?: ICompte[]
    ) {}
}
