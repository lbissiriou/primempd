import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBanque } from 'app/shared/model/banque.model';

@Component({
    selector: 'jhi-banque-detail',
    templateUrl: './banque-detail.component.html'
})
export class BanqueDetailComponent implements OnInit {
    banque: IBanque;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ banque }) => {
            this.banque = banque;
        });
    }

    previousState() {
        window.history.back();
    }
}
