import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICorps } from 'app/shared/model/corps.model';

@Component({
    selector: 'jhi-corps-detail',
    templateUrl: './corps-detail.component.html'
})
export class CorpsDetailComponent implements OnInit {
    corps: ICorps;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ corps }) => {
            this.corps = corps;
        });
    }

    previousState() {
        window.history.back();
    }
}
