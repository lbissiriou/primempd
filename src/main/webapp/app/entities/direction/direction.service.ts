import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDirection } from 'app/shared/model/direction.model';

type EntityResponseType = HttpResponse<IDirection>;
type EntityArrayResponseType = HttpResponse<IDirection[]>;

@Injectable({ providedIn: 'root' })
export class DirectionService {
    private resourceUrl = SERVER_API_URL + 'api/directions';

    constructor(private http: HttpClient) {}

    create(direction: IDirection): Observable<EntityResponseType> {
        return this.http.post<IDirection>(this.resourceUrl, direction, { observe: 'response' });
    }

    update(direction: IDirection): Observable<EntityResponseType> {
        return this.http.put<IDirection>(this.resourceUrl, direction, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDirection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDirection[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
