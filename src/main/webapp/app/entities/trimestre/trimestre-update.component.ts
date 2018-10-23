import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITrimestre } from 'app/shared/model/trimestre.model';
import { TrimestreService } from './trimestre.service';

@Component({
    selector: 'jhi-trimestre-update',
    templateUrl: './trimestre-update.component.html'
})
export class TrimestreUpdateComponent implements OnInit {
    private _trimestre: ITrimestre;
    isSaving: boolean;

    constructor(private trimestreService: TrimestreService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trimestre }) => {
            this.trimestre = trimestre;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.trimestre.id !== undefined) {
            this.subscribeToSaveResponse(this.trimestreService.update(this.trimestre));
        } else {
            this.subscribeToSaveResponse(this.trimestreService.create(this.trimestre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrimestre>>) {
        result.subscribe((res: HttpResponse<ITrimestre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get trimestre() {
        return this._trimestre;
    }

    set trimestre(trimestre: ITrimestre) {
        this._trimestre = trimestre;
    }
}
