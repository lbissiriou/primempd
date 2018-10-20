import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFonction } from 'app/shared/model/fonction.model';

@Component({
    selector: 'jhi-fonction-detail',
    templateUrl: './fonction-detail.component.html'
})
export class FonctionDetailComponent implements OnInit {
    fonction: IFonction;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fonction }) => {
            this.fonction = fonction;
        });
    }

    previousState() {
        window.history.back();
    }
}
