import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDirection } from 'app/shared/model/direction.model';
import { Principal } from 'app/core';
import { DirectionService } from './direction.service';

@Component({
    selector: 'jhi-direction',
    templateUrl: './direction.component.html'
})
export class DirectionComponent implements OnInit, OnDestroy {
    directions: IDirection[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private directionService: DirectionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.directionService.query().subscribe(
            (res: HttpResponse<IDirection[]>) => {
                this.directions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDirections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDirection) {
        return item.id;
    }

    registerChangeInDirections() {
        this.eventSubscriber = this.eventManager.subscribe('directionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
