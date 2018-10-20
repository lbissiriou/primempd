export interface IBanque {
    id?: number;
    codeBanque?: string;
    nomBanque?: string;
    siegeSocial?: string;
    telephone?: string;
    fax?: string;
    email?: string;
}

export class Banque implements IBanque {
    constructor(
        public id?: number,
        public codeBanque?: string,
        public nomBanque?: string,
        public siegeSocial?: string,
        public telephone?: string,
        public fax?: string,
        public email?: string
    ) {}
}
