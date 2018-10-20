import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Changement } from 'app/shared/model/changement.model';
import { ChangementService } from './changement.service';
import { ChangementComponent } from './changement.component';
import { ChangementDetailComponent } from './changement-detail.component';
import { ChangementUpdateComponent } from './changement-update.component';
import { ChangementDeletePopupComponent } from './changement-delete-dialog.component';
import { IChangement } from 'app/shared/model/changement.model';

@Injectable({ providedIn: 'root' })
export class ChangementResolve implements Resolve<IChangement> {
    constructor(private service: ChangementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((changement: HttpResponse<Changement>) => changement.body));
        }
        return of(new Changement());
    }
}

export const changementRoute: Routes = [
    {
        path: 'changement',
        component: ChangementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.changement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'changement/:id/view',
        component: ChangementDetailComponent,
        resolve: {
            changement: ChangementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.changement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'changement/new',
        component: ChangementUpdateComponent,
        resolve: {
            changement: ChangementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.changement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'changement/:id/edit',
        component: ChangementUpdateComponent,
        resolve: {
            changement: ChangementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.changement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changementPopupRoute: Routes = [
    {
        path: 'changement/:id/delete',
        component: ChangementDeletePopupComponent,
        resolve: {
            changement: ChangementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.changement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
