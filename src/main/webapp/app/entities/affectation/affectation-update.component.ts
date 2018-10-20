import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAffectation } from 'app/shared/model/affectation.model';
import { AffectationService } from './affectation.service';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';
import { IDirection } from 'app/shared/model/direction.model';
import { DirectionService } from 'app/entities/direction';

@Component({
    selector: 'jhi-affectation-update',
    templateUrl: './affectation-update.component.html'
})
export class AffectationUpdateComponent implements OnInit {
    private _affectation: IAffectation;
    isSaving: boolean;

    agents: IAgent[];

    directions: IDirection[];
    dateDebut: string;
    dateFin: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private affectationService: AffectationService,
        private agentService: AgentService,
        private directionService: DirectionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ affectation }) => {
            this.affectation = affectation;
        });
        this.agentService.query({ filter: 'affectation-is-null' }).subscribe(
            (res: HttpResponse<IAgent[]>) => {
                if (!this.affectation.agent || !this.affectation.agent.id) {
                    this.agents = res.body;
                } else {
                    this.agentService.find(this.affectation.agent.id).subscribe(
                        (subRes: HttpResponse<IAgent>) => {
                            this.agents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.directionService.query({ filter: 'affectation-is-null' }).subscribe(
            (res: HttpResponse<IDirection[]>) => {
                if (!this.affectation.direction || !this.affectation.direction.id) {
                    this.directions = res.body;
                } else {
                    this.directionService.find(this.affectation.direction.id).subscribe(
                        (subRes: HttpResponse<IDirection>) => {
                            this.directions = [subRes.body].concat(res.body);
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
        this.affectation.dateDebut = moment(this.dateDebut, DATE_TIME_FORMAT);
        this.affectation.dateFin = moment(this.dateFin, DATE_TIME_FORMAT);
        if (this.affectation.id !== undefined) {
            this.subscribeToSaveResponse(this.affectationService.update(this.affectation));
        } else {
            this.subscribeToSaveResponse(this.affectationService.create(this.affectation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAffectation>>) {
        result.subscribe((res: HttpResponse<IAffectation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDirectionById(index: number, item: IDirection) {
        return item.id;
    }
    get affectation() {
        return this._affectation;
    }

    set affectation(affectation: IAffectation) {
        this._affectation = affectation;
        this.dateDebut = moment(affectation.dateDebut).format(DATE_TIME_FORMAT);
        this.dateFin = moment(affectation.dateFin).format(DATE_TIME_FORMAT);
    }
}
