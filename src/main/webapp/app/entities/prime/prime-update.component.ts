import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPrime } from 'app/shared/model/prime.model';
import { PrimeService } from './prime.service';

@Component({
    selector: 'jhi-prime-update',
    templateUrl: './prime-update.component.html'
})
export class PrimeUpdateComponent implements OnInit {
    private _prime: IPrime;
    isSaving: boolean;

    constructor(private primeService: PrimeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prime }) => {
            this.prime = prime;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prime.id !== undefined) {
            this.subscribeToSaveResponse(this.primeService.update(this.prime));
        } else {
            this.subscribeToSaveResponse(this.primeService.create(this.prime));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrime>>) {
        result.subscribe((res: HttpResponse<IPrime>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get prime() {
        return this._prime;
    }

    set prime(prime: IPrime) {
        this._prime = prime;
    }
}
