import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from './agent.service';
import { IFonction } from 'app/shared/model/fonction.model';
import { FonctionService } from 'app/entities/fonction';
import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from 'app/entities/compte';
import { IDirection } from 'app/shared/model/direction.model';
import { DirectionService } from 'app/entities/direction';
import { IGrade } from 'app/shared/model/grade.model';
import { GradeService } from 'app/entities/grade';
import { ICorps } from 'app/shared/model/corps.model';
import { CorpsService } from 'app/entities/corps';

@Component({
    selector: 'jhi-agent-update',
    templateUrl: './agent-update.component.html'
})
export class AgentUpdateComponent implements OnInit {
    private _agent: IAgent;
    isSaving: boolean;

    fonctionactuelles: IFonction[];

    compteactuels: ICompte[];

    directionactuelles: IDirection[];

    gradeactuels: IGrade[];

    corpsactuels: ICorps[];
    dateNaiss: string;
    datePriseServ: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private agentService: AgentService,
        private fonctionService: FonctionService,
        private compteService: CompteService,
        private directionService: DirectionService,
        private gradeService: GradeService,
        private corpsService: CorpsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agent }) => {
            this.agent = agent;
        });
        this.fonctionService.query({ filter: 'agent-is-null' }).subscribe(
            (res: HttpResponse<IFonction[]>) => {
                if (!this.agent.fonctionActuelle || !this.agent.fonctionActuelle.id) {
                    this.fonctionactuelles = res.body;
                } else {
                    this.fonctionService.find(this.agent.fonctionActuelle.id).subscribe(
                        (subRes: HttpResponse<IFonction>) => {
                            this.fonctionactuelles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.compteService.query({ filter: 'agent-is-null' }).subscribe(
            (res: HttpResponse<ICompte[]>) => {
                if (!this.agent.compteactuel || !this.agent.compteactuel.id) {
                    this.compteactuels = res.body;
                } else {
                    this.compteService.find(this.agent.compteactuel.id).subscribe(
                        (subRes: HttpResponse<ICompte>) => {
                            this.compteactuels = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.directionService.query({ filter: 'agent-is-null' }).subscribe(
            (res: HttpResponse<IDirection[]>) => {
                if (!this.agent.directionactuelle || !this.agent.directionactuelle.id) {
                    this.directionactuelles = res.body;
                } else {
                    this.directionService.find(this.agent.directionactuelle.id).subscribe(
                        (subRes: HttpResponse<IDirection>) => {
                            this.directionactuelles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gradeService.query({ filter: 'agent-is-null' }).subscribe(
            (res: HttpResponse<IGrade[]>) => {
                if (!this.agent.gradeactuel || !this.agent.gradeactuel.id) {
                    this.gradeactuels = res.body;
                } else {
                    this.gradeService.find(this.agent.gradeactuel.id).subscribe(
                        (subRes: HttpResponse<IGrade>) => {
                            this.gradeactuels = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.corpsService.query({ filter: 'agent-is-null' }).subscribe(
            (res: HttpResponse<ICorps[]>) => {
                if (!this.agent.corpsactuel || !this.agent.corpsactuel.id) {
                    this.corpsactuels = res.body;
                } else {
                    this.corpsService.find(this.agent.corpsactuel.id).subscribe(
                        (subRes: HttpResponse<ICorps>) => {
                            this.corpsactuels = [subRes.body].concat(res.body);
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
        this.agent.dateNaiss = moment(this.dateNaiss, DATE_TIME_FORMAT);
        this.agent.datePriseServ = moment(this.datePriseServ, DATE_TIME_FORMAT);
        if (this.agent.id !== undefined) {
            this.subscribeToSaveResponse(this.agentService.update(this.agent));
        } else {
            this.subscribeToSaveResponse(this.agentService.create(this.agent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgent>>) {
        result.subscribe((res: HttpResponse<IAgent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFonctionById(index: number, item: IFonction) {
        return item.id;
    }

    trackCompteById(index: number, item: ICompte) {
        return item.id;
    }

    trackDirectionById(index: number, item: IDirection) {
        return item.id;
    }

    trackGradeById(index: number, item: IGrade) {
        return item.id;
    }

    trackCorpsById(index: number, item: ICorps) {
        return item.id;
    }
    get agent() {
        return this._agent;
    }

    set agent(agent: IAgent) {
        this._agent = agent;
        this.dateNaiss = moment(agent.dateNaiss).format(DATE_TIME_FORMAT);
        this.datePriseServ = moment(agent.datePriseServ).format(DATE_TIME_FORMAT);
    }
}
