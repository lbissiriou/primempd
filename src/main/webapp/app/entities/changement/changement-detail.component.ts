import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChangement } from 'app/shared/model/changement.model';

@Component({
    selector: 'jhi-changement-detail',
    templateUrl: './changement-detail.component.html'
})
export class ChangementDetailComponent implements OnInit {
    changement: IChangement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ changement }) => {
            this.changement = changement;
        });
    }

    previousState() {
        window.history.back();
    }
}
