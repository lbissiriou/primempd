import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banque } from 'app/shared/model/banque.model';
import { BanqueService } from './banque.service';
import { BanqueComponent } from './banque.component';
import { BanqueDetailComponent } from './banque-detail.component';
import { BanqueUpdateComponent } from './banque-update.component';
import { BanqueDeletePopupComponent } from './banque-delete-dialog.component';
import { IBanque } from 'app/shared/model/banque.model';

@Injectable({ providedIn: 'root' })
export class BanqueResolve implements Resolve<IBanque> {
    constructor(private service: BanqueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((banque: HttpResponse<Banque>) => banque.body));
        }
        return of(new Banque());
    }
}

export const banqueRoute: Routes = [
    {
        path: 'banque',
        component: BanqueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.banque.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banque/:id/view',
        component: BanqueDetailComponent,
        resolve: {
            banque: BanqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.banque.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banque/new',
        component: BanqueUpdateComponent,
        resolve: {
            banque: BanqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.banque.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banque/:id/edit',
        component: BanqueUpdateComponent,
        resolve: {
            banque: BanqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.banque.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const banquePopupRoute: Routes = [
    {
        path: 'banque/:id/delete',
        component: BanqueDeletePopupComponent,
        resolve: {
            banque: BanqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.banque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
