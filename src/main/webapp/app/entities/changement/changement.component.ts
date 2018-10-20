import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChangement } from 'app/shared/model/changement.model';
import { Principal } from 'app/core';
import { ChangementService } from './changement.service';

@Component({
    selector: 'jhi-changement',
    templateUrl: './changement.component.html'
})
export class ChangementComponent implements OnInit, OnDestroy {
    changements: IChangement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private changementService: ChangementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.changementService.query().subscribe(
            (res: HttpResponse<IChangement[]>) => {
                this.changements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChangements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChangement) {
        return item.id;
    }

    registerChangeInChangements() {
        this.eventSubscriber = this.eventManager.subscribe('changementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
