import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrime } from 'app/shared/model/prime.model';

@Component({
    selector: 'jhi-prime-detail',
    templateUrl: './prime-detail.component.html'
})
export class PrimeDetailComponent implements OnInit {
    prime: IPrime;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prime }) => {
            this.prime = prime;
        });
    }

    previousState() {
        window.history.back();
    }
}
