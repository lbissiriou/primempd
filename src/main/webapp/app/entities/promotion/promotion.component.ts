import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPromotion } from 'app/shared/model/promotion.model';
import { Principal } from 'app/core';
import { PromotionService } from './promotion.service';

@Component({
    selector: 'jhi-promotion',
    templateUrl: './promotion.component.html'
})
export class PromotionComponent implements OnInit, OnDestroy {
    promotions: IPromotion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private promotionService: PromotionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.promotionService.query().subscribe(
            (res: HttpResponse<IPromotion[]>) => {
                this.promotions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPromotions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPromotion) {
        return item.id;
    }

    registerChangeInPromotions() {
        this.eventSubscriber = this.eventManager.subscribe('promotionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
