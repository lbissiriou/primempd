import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAvancement } from 'app/shared/model/avancement.model';

@Component({
    selector: 'jhi-avancement-detail',
    templateUrl: './avancement-detail.component.html'
})
export class AvancementDetailComponent implements OnInit {
    avancement: IAvancement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ avancement }) => {
            this.avancement = avancement;
        });
    }

    previousState() {
        window.history.back();
    }
}
