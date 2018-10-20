import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fonction } from 'app/shared/model/fonction.model';
import { FonctionService } from './fonction.service';
import { FonctionComponent } from './fonction.component';
import { FonctionDetailComponent } from './fonction-detail.component';
import { FonctionUpdateComponent } from './fonction-update.component';
import { FonctionDeletePopupComponent } from './fonction-delete-dialog.component';
import { IFonction } from 'app/shared/model/fonction.model';

@Injectable({ providedIn: 'root' })
export class FonctionResolve implements Resolve<IFonction> {
    constructor(private service: FonctionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fonction: HttpResponse<Fonction>) => fonction.body));
        }
        return of(new Fonction());
    }
}

export const fonctionRoute: Routes = [
    {
        path: 'fonction',
        component: FonctionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.fonction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fonction/:id/view',
        component: FonctionDetailComponent,
        resolve: {
            fonction: FonctionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.fonction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fonction/new',
        component: FonctionUpdateComponent,
        resolve: {
            fonction: FonctionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.fonction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fonction/:id/edit',
        component: FonctionUpdateComponent,
        resolve: {
            fonction: FonctionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.fonction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fonctionPopupRoute: Routes = [
    {
        path: 'fonction/:id/delete',
        component: FonctionDeletePopupComponent,
        resolve: {
            fonction: FonctionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.fonction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
