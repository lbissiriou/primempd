import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgent } from 'app/shared/model/agent.model';

type EntityResponseType = HttpResponse<IAgent>;
type EntityArrayResponseType = HttpResponse<IAgent[]>;

@Injectable({ providedIn: 'root' })
export class AgentService {
    private resourceUrl = SERVER_API_URL + 'api/agents';

    constructor(private http: HttpClient) {}

    create(agent: IAgent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agent);
        return this.http
            .post<IAgent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(agent: IAgent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agent);
        return this.http
            .put<IAgent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(agent: IAgent): IAgent {
        const copy: IAgent = Object.assign({}, agent, {
            dateNaiss: agent.dateNaiss != null && agent.dateNaiss.isValid() ? agent.dateNaiss.toJSON() : null,
            datePriseServ: agent.datePriseServ != null && agent.datePriseServ.isValid() ? agent.datePriseServ.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateNaiss = res.body.dateNaiss != null ? moment(res.body.dateNaiss) : null;
        res.body.datePriseServ = res.body.datePriseServ != null ? moment(res.body.datePriseServ) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((agent: IAgent) => {
            agent.dateNaiss = agent.dateNaiss != null ? moment(agent.dateNaiss) : null;
            agent.datePriseServ = agent.datePriseServ != null ? moment(agent.datePriseServ) : null;
        });
        return res;
    }
}
