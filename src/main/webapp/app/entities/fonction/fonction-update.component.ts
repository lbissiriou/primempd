import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFonction } from 'app/shared/model/fonction.model';
import { FonctionService } from './fonction.service';

@Component({
    selector: 'jhi-fonction-update',
    templateUrl: './fonction-update.component.html'
})
export class FonctionUpdateComponent implements OnInit {
    private _fonction: IFonction;
    isSaving: boolean;

    constructor(private fonctionService: FonctionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fonction }) => {
            this.fonction = fonction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fonction.id !== undefined) {
            this.subscribeToSaveResponse(this.fonctionService.update(this.fonction));
        } else {
            this.subscribeToSaveResponse(this.fonctionService.create(this.fonction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFonction>>) {
        result.subscribe((res: HttpResponse<IFonction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get fonction() {
        return this._fonction;
    }

    set fonction(fonction: IFonction) {
        this._fonction = fonction;
    }
}
