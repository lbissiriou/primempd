import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompte } from 'app/shared/model/compte.model';
import { CompteService } from './compte.service';
import { IBanque } from 'app/shared/model/banque.model';
import { BanqueService } from 'app/entities/banque';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';

@Component({
    selector: 'jhi-compte-update',
    templateUrl: './compte-update.component.html'
})
export class CompteUpdateComponent implements OnInit {
    private _compte: ICompte;
    isSaving: boolean;

    banques: IBanque[];

    agents: IAgent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private compteService: CompteService,
        private banqueService: BanqueService,
        private agentService: AgentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ compte }) => {
            this.compte = compte;
        });
        this.banqueService.query({ filter: 'compte-is-null' }).subscribe(
            (res: HttpResponse<IBanque[]>) => {
                if (!this.compte.banque || !this.compte.banque.id) {
                    this.banques = res.body;
                } else {
                    this.banqueService.find(this.compte.banque.id).subscribe(
                        (subRes: HttpResponse<IBanque>) => {
                            this.banques = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentService.query().subscribe(
            (res: HttpResponse<IAgent[]>) => {
                this.agents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.compte.id !== undefined) {
            this.subscribeToSaveResponse(this.compteService.update(this.compte));
        } else {
            this.subscribeToSaveResponse(this.compteService.create(this.compte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompte>>) {
        result.subscribe((res: HttpResponse<ICompte>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBanqueById(index: number, item: IBanque) {
        return item.id;
    }

    trackAgentById(index: number, item: IAgent) {
        return item.id;
    }
    get compte() {
        return this._compte;
    }

    set compte(compte: ICompte) {
        this._compte = compte;
    }
}
