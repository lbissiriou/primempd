import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGrade } from 'app/shared/model/grade.model';
import { GradeService } from './grade.service';

@Component({
    selector: 'jhi-grade-update',
    templateUrl: './grade-update.component.html'
})
export class GradeUpdateComponent implements OnInit {
    private _grade: IGrade;
    isSaving: boolean;

    constructor(private gradeService: GradeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grade }) => {
            this.grade = grade;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.grade.id !== undefined) {
            this.subscribeToSaveResponse(this.gradeService.update(this.grade));
        } else {
            this.subscribeToSaveResponse(this.gradeService.create(this.grade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>) {
        result.subscribe((res: HttpResponse<IGrade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get grade() {
        return this._grade;
    }

    set grade(grade: IGrade) {
        this._grade = grade;
    }
}
