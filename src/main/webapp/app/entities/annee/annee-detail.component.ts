import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnnee } from 'app/shared/model/annee.model';

@Component({
    selector: 'jhi-annee-detail',
    templateUrl: './annee-detail.component.html'
})
export class AnneeDetailComponent implements OnInit {
    annee: IAnnee;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annee }) => {
            this.annee = annee;
        });
    }

    previousState() {
        window.history.back();
    }
}
