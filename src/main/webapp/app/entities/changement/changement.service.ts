import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChangement } from 'app/shared/model/changement.model';

type EntityResponseType = HttpResponse<IChangement>;
type EntityArrayResponseType = HttpResponse<IChangement[]>;

@Injectable({ providedIn: 'root' })
export class ChangementService {
    private resourceUrl = SERVER_API_URL + 'api/changements';

    constructor(private http: HttpClient) {}

    create(changement: IChangement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(changement);
        return this.http
            .post<IChangement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(changement: IChangement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(changement);
        return this.http
            .put<IChangement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IChangement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IChangement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(changement: IChangement): IChangement {
        const copy: IChangement = Object.assign({}, changement, {
            dateDebut: changement.dateDebut != null && changement.dateDebut.isValid() ? changement.dateDebut.toJSON() : null,
            datefin: changement.datefin != null && changement.datefin.isValid() ? changement.datefin.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
        res.body.datefin = res.body.datefin != null ? moment(res.body.datefin) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((changement: IChangement) => {
            changement.dateDebut = changement.dateDebut != null ? moment(changement.dateDebut) : null;
            changement.datefin = changement.datefin != null ? moment(changement.datefin) : null;
        });
        return res;
    }
}
