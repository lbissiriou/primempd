import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prime } from 'app/shared/model/prime.model';
import { PrimeService } from './prime.service';
import { PrimeComponent } from './prime.component';
import { PrimeDetailComponent } from './prime-detail.component';
import { PrimeUpdateComponent } from './prime-update.component';
import { PrimeDeletePopupComponent } from './prime-delete-dialog.component';
import { IPrime } from 'app/shared/model/prime.model';

@Injectable({ providedIn: 'root' })
export class PrimeResolve implements Resolve<IPrime> {
    constructor(private service: PrimeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prime: HttpResponse<Prime>) => prime.body));
        }
        return of(new Prime());
    }
}

export const primeRoute: Routes = [
    {
        path: 'prime',
        component: PrimeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.prime.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prime/:id/view',
        component: PrimeDetailComponent,
        resolve: {
            prime: PrimeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.prime.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prime/new',
        component: PrimeUpdateComponent,
        resolve: {
            prime: PrimeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.prime.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prime/:id/edit',
        component: PrimeUpdateComponent,
        resolve: {
            prime: PrimeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.prime.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const primePopupRoute: Routes = [
    {
        path: 'prime/:id/delete',
        component: PrimeDeletePopupComponent,
        resolve: {
            prime: PrimeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.prime.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
