import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGrade } from 'app/shared/model/grade.model';
import { Principal } from 'app/core';
import { GradeService } from './grade.service';

@Component({
    selector: 'jhi-grade',
    templateUrl: './grade.component.html'
})
export class GradeComponent implements OnInit, OnDestroy {
    grades: IGrade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gradeService: GradeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gradeService.query().subscribe(
            (res: HttpResponse<IGrade[]>) => {
                this.grades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGrades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGrade) {
        return item.id;
    }

    registerChangeInGrades() {
        this.eventSubscriber = this.eventManager.subscribe('gradeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
