import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IChangement } from 'app/shared/model/changement.model';
import { ChangementService } from './changement.service';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';
import { ICorps } from 'app/shared/model/corps.model';
import { CorpsService } from 'app/entities/corps';

@Component({
    selector: 'jhi-changement-update',
    templateUrl: './changement-update.component.html'
})
export class ChangementUpdateComponent implements OnInit {
    private _changement: IChangement;
    isSaving: boolean;

    agents: IAgent[];

    corps: ICorps[];
    dateDebut: string;
    datefin: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private changementService: ChangementService,
        private agentService: AgentService,
        private corpsService: CorpsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ changement }) => {
            this.changement = changement;
        });
        this.agentService.query({ filter: 'changement-is-null' }).subscribe(
            (res: HttpResponse<IAgent[]>) => {
                if (!this.changement.agent || !this.changement.agent.id) {
                    this.agents = res.body;
                } else {
                    this.agentService.find(this.changement.agent.id).subscribe(
                        (subRes: HttpResponse<IAgent>) => {
                            this.agents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.corpsService.query({ filter: 'changement-is-null' }).subscribe(
            (res: HttpResponse<ICorps[]>) => {
                if (!this.changement.corps || !this.changement.corps.id) {
                    this.corps = res.body;
                } else {
                    this.corpsService.find(this.changement.corps.id).subscribe(
                        (subRes: HttpResponse<ICorps>) => {
                            this.corps = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.changement.dateDebut = moment(this.dateDebut, DATE_TIME_FORMAT);
        this.changement.datefin = moment(this.datefin, DATE_TIME_FORMAT);
        if (this.changement.id !== undefined) {
            this.subscribeToSaveResponse(this.changementService.update(this.changement));
        } else {
            this.subscribeToSaveResponse(this.changementService.create(this.changement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChangement>>) {
        result.subscribe((res: HttpResponse<IChangement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAgentById(index: number, item: IAgent) {
        return item.id;
    }

    trackCorpsById(index: number, item: ICorps) {
        return item.id;
    }
    get changement() {
        return this._changement;
    }

    set changement(changement: IChangement) {
        this._changement = changement;
        this.dateDebut = moment(changement.dateDebut).format(DATE_TIME_FORMAT);
        this.datefin = moment(changement.datefin).format(DATE_TIME_FORMAT);
    }
}
