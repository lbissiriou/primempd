import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDirection } from 'app/shared/model/direction.model';

@Component({
    selector: 'jhi-direction-detail',
    templateUrl: './direction-detail.component.html'
})
export class DirectionDetailComponent implements OnInit {
    direction: IDirection;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ direction }) => {
            this.direction = direction;
        });
    }

    previousState() {
        window.history.back();
    }
}
