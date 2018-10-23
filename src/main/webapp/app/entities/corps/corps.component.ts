import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICorps } from 'app/shared/model/corps.model';
import { Principal } from 'app/core';
import { CorpsService } from './corps.service';

@Component({
    selector: 'jhi-corps',
    templateUrl: './corps.component.html'
})
export class CorpsComponent implements OnInit, OnDestroy {
    corps: ICorps[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private corpsService: CorpsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.corpsService.query().subscribe(
            (res: HttpResponse<ICorps[]>) => {
                this.corps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCorps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICorps) {
        return item.id;
    }

    registerChangeInCorps() {
        this.eventSubscriber = this.eventManager.subscribe('corpsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
