import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllouer } from 'app/shared/model/allouer.model';

@Component({
    selector: 'jhi-allouer-detail',
    templateUrl: './allouer-detail.component.html'
})
export class AllouerDetailComponent implements OnInit {
    allouer: IAllouer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ allouer }) => {
            this.allouer = allouer;
        });
    }

    previousState() {
        window.history.back();
    }
}
