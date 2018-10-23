import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBanque } from 'app/shared/model/banque.model';
import { Principal } from 'app/core';
import { BanqueService } from './banque.service';

@Component({
    selector: 'jhi-banque',
    templateUrl: './banque.component.html'
})
export class BanqueComponent implements OnInit, OnDestroy {
    banques: IBanque[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private banqueService: BanqueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.banqueService.query().subscribe(
            (res: HttpResponse<IBanque[]>) => {
                this.banques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBanques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBanque) {
        return item.id;
    }

    registerChangeInBanques() {
        this.eventSubscriber = this.eventManager.subscribe('banqueListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
