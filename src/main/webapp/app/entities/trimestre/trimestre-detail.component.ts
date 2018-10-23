import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrimestre } from 'app/shared/model/trimestre.model';

@Component({
    selector: 'jhi-trimestre-detail',
    templateUrl: './trimestre-detail.component.html'
})
export class TrimestreDetailComponent implements OnInit {
    trimestre: ITrimestre;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trimestre }) => {
            this.trimestre = trimestre;
        });
    }

    previousState() {
        window.history.back();
    }
}
