import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Annee } from 'app/shared/model/annee.model';
import { AnneeService } from './annee.service';
import { AnneeComponent } from './annee.component';
import { AnneeDetailComponent } from './annee-detail.component';
import { AnneeUpdateComponent } from './annee-update.component';
import { AnneeDeletePopupComponent } from './annee-delete-dialog.component';
import { IAnnee } from 'app/shared/model/annee.model';

@Injectable({ providedIn: 'root' })
export class AnneeResolve implements Resolve<IAnnee> {
    constructor(private service: AnneeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((annee: HttpResponse<Annee>) => annee.body));
        }
        return of(new Annee());
    }
}

export const anneeRoute: Routes = [
    {
        path: 'annee',
        component: AnneeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.annee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annee/:id/view',
        component: AnneeDetailComponent,
        resolve: {
            annee: AnneeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.annee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annee/new',
        component: AnneeUpdateComponent,
        resolve: {
            annee: AnneeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.annee.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annee/:id/edit',
        component: AnneeUpdateComponent,
        resolve: {
            annee: AnneeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.annee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anneePopupRoute: Routes = [
    {
        path: 'annee/:id/delete',
        component: AnneeDeletePopupComponent,
        resolve: {
            annee: AnneeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.annee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
