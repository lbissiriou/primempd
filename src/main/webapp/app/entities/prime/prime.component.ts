import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrime } from 'app/shared/model/prime.model';
import { Principal } from 'app/core';
import { PrimeService } from './prime.service';

@Component({
    selector: 'jhi-prime',
    templateUrl: './prime.component.html'
})
export class PrimeComponent implements OnInit, OnDestroy {
    primes: IPrime[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private primeService: PrimeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.primeService.query().subscribe(
            (res: HttpResponse<IPrime[]>) => {
                this.primes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrimes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrime) {
        return item.id;
    }

    registerChangeInPrimes() {
        this.eventSubscriber = this.eventManager.subscribe('primeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
