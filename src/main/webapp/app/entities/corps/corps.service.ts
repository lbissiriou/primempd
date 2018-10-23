import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICorps } from 'app/shared/model/corps.model';

type EntityResponseType = HttpResponse<ICorps>;
type EntityArrayResponseType = HttpResponse<ICorps[]>;

@Injectable({ providedIn: 'root' })
export class CorpsService {
    private resourceUrl = SERVER_API_URL + 'api/corps';

    constructor(private http: HttpClient) {}

    create(corps: ICorps): Observable<EntityResponseType> {
        return this.http.post<ICorps>(this.resourceUrl, corps, { observe: 'response' });
    }

    update(corps: ICorps): Observable<EntityResponseType> {
        return this.http.put<ICorps>(this.resourceUrl, corps, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICorps>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICorps[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
