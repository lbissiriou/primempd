import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAnnee } from 'app/shared/model/annee.model';
import { AnneeService } from './annee.service';

@Component({
    selector: 'jhi-annee-update',
    templateUrl: './annee-update.component.html'
})
export class AnneeUpdateComponent implements OnInit {
    private _annee: IAnnee;
    isSaving: boolean;

    constructor(private anneeService: AnneeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ annee }) => {
            this.annee = annee;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.annee.id !== undefined) {
            this.subscribeToSaveResponse(this.anneeService.update(this.annee));
        } else {
            this.subscribeToSaveResponse(this.anneeService.create(this.annee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnnee>>) {
        result.subscribe((res: HttpResponse<IAnnee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get annee() {
        return this._annee;
    }

    set annee(annee: IAnnee) {
        this._annee = annee;
    }
}
