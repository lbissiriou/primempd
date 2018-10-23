import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAllouer } from 'app/shared/model/allouer.model';

type EntityResponseType = HttpResponse<IAllouer>;
type EntityArrayResponseType = HttpResponse<IAllouer[]>;

@Injectable({ providedIn: 'root' })
export class AllouerService {
    private resourceUrl = SERVER_API_URL + 'api/allouers';

    constructor(private http: HttpClient) {}

    create(allouer: IAllouer): Observable<EntityResponseType> {
        return this.http.post<IAllouer>(this.resourceUrl, allouer, { observe: 'response' });
    }

    update(allouer: IAllouer): Observable<EntityResponseType> {
        return this.http.put<IAllouer>(this.resourceUrl, allouer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAllouer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAllouer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
