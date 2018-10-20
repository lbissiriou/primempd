import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAvancement } from 'app/shared/model/avancement.model';
import { AvancementService } from './avancement.service';
import { IGrade } from 'app/shared/model/grade.model';
import { GradeService } from 'app/entities/grade';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';

@Component({
    selector: 'jhi-avancement-update',
    templateUrl: './avancement-update.component.html'
})
export class AvancementUpdateComponent implements OnInit {
    private _avancement: IAvancement;
    isSaving: boolean;

    grades: IGrade[];

    agents: IAgent[];
    dateDebut: string;
    dateFin: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private avancementService: AvancementService,
        private gradeService: GradeService,
        private agentService: AgentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ avancement }) => {
            this.avancement = avancement;
        });
        this.gradeService.query({ filter: 'avancement-is-null' }).subscribe(
            (res: HttpResponse<IGrade[]>) => {
                if (!this.avancement.grade || !this.avancement.grade.id) {
                    this.grades = res.body;
                } else {
                    this.gradeService.find(this.avancement.grade.id).subscribe(
                        (subRes: HttpResponse<IGrade>) => {
                            this.grades = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentService.query({ filter: 'avancement-is-null' }).subscribe(
            (res: HttpResponse<IAgent[]>) => {
                if (!this.avancement.agent || !this.avancement.agent.id) {
                    this.agents = res.body;
                } else {
                    this.agentService.find(this.avancement.agent.id).subscribe(
                        (subRes: HttpResponse<IAgent>) => {
                            this.agents = [subRes.body].concat(res.body);
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
        this.avancement.dateDebut = moment(this.dateDebut, DATE_TIME_FORMAT);
        this.avancement.dateFin = moment(this.dateFin, DATE_TIME_FORMAT);
        if (this.avancement.id !== undefined) {
            this.subscribeToSaveResponse(this.avancementService.update(this.avancement));
        } else {
            this.subscribeToSaveResponse(this.avancementService.create(this.avancement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAvancement>>) {
        result.subscribe((res: HttpResponse<IAvancement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGradeById(index: number, item: IGrade) {
        return item.id;
    }

    trackAgentById(index: number, item: IAgent) {
        return item.id;
    }
    get avancement() {
        return this._avancement;
    }

    set avancement(avancement: IAvancement) {
        this._avancement = avancement;
        this.dateDebut = moment(avancement.dateDebut).format(DATE_TIME_FORMAT);
        this.dateFin = moment(avancement.dateFin).format(DATE_TIME_FORMAT);
    }
}
