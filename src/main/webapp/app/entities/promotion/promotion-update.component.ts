import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPromotion } from 'app/shared/model/promotion.model';
import { PromotionService } from './promotion.service';
import { IAgent } from 'app/shared/model/agent.model';
import { AgentService } from 'app/entities/agent';
import { IFonction } from 'app/shared/model/fonction.model';
import { FonctionService } from 'app/entities/fonction';

@Component({
    selector: 'jhi-promotion-update',
    templateUrl: './promotion-update.component.html'
})
export class PromotionUpdateComponent implements OnInit {
    private _promotion: IPromotion;
    isSaving: boolean;

    agents: IAgent[];

    fonctions: IFonction[];
    dateDebut: string;
    dateFin: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private promotionService: PromotionService,
        private agentService: AgentService,
        private fonctionService: FonctionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ promotion }) => {
            this.promotion = promotion;
        });
        this.agentService.query({ filter: 'promotion-is-null' }).subscribe(
            (res: HttpResponse<IAgent[]>) => {
                if (!this.promotion.agent || !this.promotion.agent.id) {
                    this.agents = res.body;
                } else {
                    this.agentService.find(this.promotion.agent.id).subscribe(
                        (subRes: HttpResponse<IAgent>) => {
                            this.agents = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fonctionService.query({ filter: 'promotion-is-null' }).subscribe(
            (res: HttpResponse<IFonction[]>) => {
                if (!this.promotion.fonction || !this.promotion.fonction.id) {
                    this.fonctions = res.body;
                } else {
                    this.fonctionService.find(this.promotion.fonction.id).subscribe(
                        (subRes: HttpResponse<IFonction>) => {
                            this.fonctions = [subRes.body].concat(res.body);
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
        this.promotion.dateDebut = moment(this.dateDebut, DATE_TIME_FORMAT);
        this.promotion.dateFin = moment(this.dateFin, DATE_TIME_FORMAT);
        if (this.promotion.id !== undefined) {
            this.subscribeToSaveResponse(this.promotionService.update(this.promotion));
        } else {
            this.subscribeToSaveResponse(this.promotionService.create(this.promotion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPromotion>>) {
        result.subscribe((res: HttpResponse<IPromotion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFonctionById(index: number, item: IFonction) {
        return item.id;
    }
    get promotion() {
        return this._promotion;
    }

    set promotion(promotion: IPromotion) {
        this._promotion = promotion;
        this.dateDebut = moment(promotion.dateDebut).format(DATE_TIME_FORMAT);
        this.dateFin = moment(promotion.dateFin).format(DATE_TIME_FORMAT);
    }
}
