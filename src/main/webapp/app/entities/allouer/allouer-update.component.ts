import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAllouer } from 'app/shared/model/allouer.model';
import { AllouerService } from './allouer.service';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';
import { IPrime } from 'app/shared/model/prime.model';
import { PrimeService } from 'app/entities/prime';
import { IAnnee } from 'app/shared/model/annee.model';
import { AnneeService } from 'app/entities/annee';
import { ITrimestre } from 'app/shared/model/trimestre.model';
import { TrimestreService } from 'app/entities/trimestre';

@Component({
    selector: 'jhi-allouer-update',
    templateUrl: './allouer-update.component.html'
})
export class AllouerUpdateComponent implements OnInit {
    private _allouer: IAllouer;
    isSaving: boolean;

    agents: IAgent[];

    primes: IPrime[];

    annees: IAnnee[];

    trimestres: ITrimestre[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private allouerService: AllouerService,
        private agentService: AgentService,
        private primeService: PrimeService,
        private anneeService: AnneeService,
        private trimestreService: TrimestreService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ allouer }) => {
            this.allouer = allouer;
        });
        this.agentService.query({ filter: 'allouer-is-null' }).subscribe(
            (res: HttpResponse<IAgent[]>) => {
                if (!this.allouer.agent || !this.allouer.agent.id) {
                    this.agents = res.body;
                } else {
                    this.agentService.find(this.allouer.agent.id).subscribe(
                        (subRes: HttpResponse<IAgent>) => {
                            this.agents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.primeService.query({ filter: 'allouer-is-null' }).subscribe(
            (res: HttpResponse<IPrime[]>) => {
                if (!this.allouer.prime || !this.allouer.prime.id) {
                    this.primes = res.body;
                } else {
                    this.primeService.find(this.allouer.prime.id).subscribe(
                        (subRes: HttpResponse<IPrime>) => {
                            this.primes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.anneeService.query({ filter: 'allouer-is-null' }).subscribe(
            (res: HttpResponse<IAnnee[]>) => {
                if (!this.allouer.annee || !this.allouer.annee.id) {
                    this.annees = res.body;
                } else {
                    this.anneeService.find(this.allouer.annee.id).subscribe(
                        (subRes: HttpResponse<IAnnee>) => {
                            this.annees = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.trimestreService.query({ filter: 'allouer-is-null' }).subscribe(
            (res: HttpResponse<ITrimestre[]>) => {
                if (!this.allouer.trimestre || !this.allouer.trimestre.id) {
                    this.trimestres = res.body;
                } else {
                    this.trimestreService.find(this.allouer.trimestre.id).subscribe(
                        (subRes: HttpResponse<ITrimestre>) => {
                            this.trimestres = [subRes.body].concat(res.body);
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
        if (this.allouer.id !== undefined) {
            this.subscribeToSaveResponse(this.allouerService.update(this.allouer));
        } else {
            this.subscribeToSaveResponse(this.allouerService.create(this.allouer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAllouer>>) {
        result.subscribe((res: HttpResponse<IAllouer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPrimeById(index: number, item: IPrime) {
        return item.id;
    }

    trackAnneeById(index: number, item: IAnnee) {
        return item.id;
    }

    trackTrimestreById(index: number, item: ITrimestre) {
        return item.id;
    }
    get allouer() {
        return this._allouer;
    }

    set allouer(allouer: IAllouer) {
        this._allouer = allouer;
    }
}
