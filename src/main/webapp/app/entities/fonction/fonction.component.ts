import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFonction } from 'app/shared/model/fonction.model';
import { Principal } from 'app/core';
import { FonctionService } from './fonction.service';

@Component({
    selector: 'jhi-fonction',
    templateUrl: './fonction.component.html'
})
export class FonctionComponent implements OnInit, OnDestroy {
    fonctions: IFonction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fonctionService: FonctionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.fonctionService.query().subscribe(
            (res: HttpResponse<IFonction[]>) => {
                this.fonctions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFonctions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFonction) {
        return item.id;
    }

    registerChangeInFonctions() {
        this.eventSubscriber = this.eventManager.subscribe('fonctionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
