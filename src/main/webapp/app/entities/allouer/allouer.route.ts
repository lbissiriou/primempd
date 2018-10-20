import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Allouer } from 'app/shared/model/allouer.model';
import { AllouerService } from './allouer.service';
import { AllouerComponent } from './allouer.component';
import { AllouerDetailComponent } from './allouer-detail.component';
import { AllouerUpdateComponent } from './allouer-update.component';
import { AllouerDeletePopupComponent } from './allouer-delete-dialog.component';
import { IAllouer } from 'app/shared/model/allouer.model';

@Injectable({ providedIn: 'root' })
export class AllouerResolve implements Resolve<IAllouer> {
    constructor(private service: AllouerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((allouer: HttpResponse<Allouer>) => allouer.body));
        }
        return of(new Allouer());
    }
}

export const allouerRoute: Routes = [
    {
        path: 'allouer',
        component: AllouerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.allouer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'allouer/:id/view',
        component: AllouerDetailComponent,
        resolve: {
            allouer: AllouerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.allouer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'allouer/new',
        component: AllouerUpdateComponent,
        resolve: {
            allouer: AllouerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.allouer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'allouer/:id/edit',
        component: AllouerUpdateComponent,
        resolve: {
            allouer: AllouerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.allouer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const allouerPopupRoute: Routes = [
    {
        path: 'allouer/:id/delete',
        component: AllouerDeletePopupComponent,
        resolve: {
            allouer: AllouerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.allouer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
