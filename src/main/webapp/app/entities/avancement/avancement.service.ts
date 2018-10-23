import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAvancement } from 'app/shared/model/avancement.model';

type EntityResponseType = HttpResponse<IAvancement>;
type EntityArrayResponseType = HttpResponse<IAvancement[]>;

@Injectable({ providedIn: 'root' })
export class AvancementService {
    private resourceUrl = SERVER_API_URL + 'api/avancements';

    constructor(private http: HttpClient) {}

    create(avancement: IAvancement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(avancement);
        return this.http
            .post<IAvancement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(avancement: IAvancement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(avancement);
        return this.http
            .put<IAvancement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAvancement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAvancement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(avancement: IAvancement): IAvancement {
        const copy: IAvancement = Object.assign({}, avancement, {
            dateDebut: avancement.dateDebut != null && avancement.dateDebut.isValid() ? avancement.dateDebut.toJSON() : null,
            dateFin: avancement.dateFin != null && avancement.dateFin.isValid() ? avancement.dateFin.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
        res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((avancement: IAvancement) => {
            avancement.dateDebut = avancement.dateDebut != null ? moment(avancement.dateDebut) : null;
            avancement.dateFin = avancement.dateFin != null ? moment(avancement.dateFin) : null;
        });
        return res;
    }
}
