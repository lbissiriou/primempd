import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPromotion } from 'app/shared/model/promotion.model';

type EntityResponseType = HttpResponse<IPromotion>;
type EntityArrayResponseType = HttpResponse<IPromotion[]>;

@Injectable({ providedIn: 'root' })
export class PromotionService {
    private resourceUrl = SERVER_API_URL + 'api/promotions';

    constructor(private http: HttpClient) {}

    create(promotion: IPromotion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(promotion);
        return this.http
            .post<IPromotion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(promotion: IPromotion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(promotion);
        return this.http
            .put<IPromotion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPromotion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPromotion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(promotion: IPromotion): IPromotion {
        const copy: IPromotion = Object.assign({}, promotion, {
            dateDebut: promotion.dateDebut != null && promotion.dateDebut.isValid() ? promotion.dateDebut.toJSON() : null,
            dateFin: promotion.dateFin != null && promotion.dateFin.isValid() ? promotion.dateFin.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
        res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((promotion: IPromotion) => {
            promotion.dateDebut = promotion.dateDebut != null ? moment(promotion.dateDebut) : null;
            promotion.dateFin = promotion.dateFin != null ? moment(promotion.dateFin) : null;
        });
        return res;
    }
}
