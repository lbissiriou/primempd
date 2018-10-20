import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDirection } from 'app/shared/model/direction.model';
import { DirectionService } from './direction.service';

@Component({
    selector: 'jhi-direction-update',
    templateUrl: './direction-update.component.html'
})
export class DirectionUpdateComponent implements OnInit {
    private _direction: IDirection;
    isSaving: boolean;

    constructor(private directionService: DirectionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ direction }) => {
            this.direction = direction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.direction.id !== undefined) {
            this.subscribeToSaveResponse(this.directionService.update(this.direction));
        } else {
            this.subscribeToSaveResponse(this.directionService.create(this.direction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDirection>>) {
        result.subscribe((res: HttpResponse<IDirection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get direction() {
        return this._direction;
    }

    set direction(direction: IDirection) {
        this._direction = direction;
    }
}
