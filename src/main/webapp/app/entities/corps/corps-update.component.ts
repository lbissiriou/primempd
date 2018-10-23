import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICorps } from 'app/shared/model/corps.model';
import { CorpsService } from './corps.service';

@Component({
    selector: 'jhi-corps-update',
    templateUrl: './corps-update.component.html'
})
export class CorpsUpdateComponent implements OnInit {
    private _corps: ICorps;
    isSaving: boolean;

    constructor(private corpsService: CorpsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ corps }) => {
            this.corps = corps;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.corps.id !== undefined) {
            this.subscribeToSaveResponse(this.corpsService.update(this.corps));
        } else {
            this.subscribeToSaveResponse(this.corpsService.create(this.corps));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICorps>>) {
        result.subscribe((res: HttpResponse<ICorps>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get corps() {
        return this._corps;
    }

    set corps(corps: ICorps) {
        this._corps = corps;
    }
}
