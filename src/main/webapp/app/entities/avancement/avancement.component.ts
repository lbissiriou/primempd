import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAvancement } from 'app/shared/model/avancement.model';
import { Principal } from 'app/core';
import { AvancementService } from './avancement.service';

@Component({
    selector: 'jhi-avancement',
    templateUrl: './avancement.component.html'
})
export class AvancementComponent implements OnInit, OnDestroy {
    avancements: IAvancement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private avancementService: AvancementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.avancementService.query().subscribe(
            (res: HttpResponse<IAvancement[]>) => {
                this.avancements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAvancements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAvancement) {
        return item.id;
    }

    registerChangeInAvancements() {
        this.eventSubscriber = this.eventManager.subscribe('avancementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
