import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Corps } from 'app/shared/model/corps.model';
import { CorpsService } from './corps.service';
import { CorpsComponent } from './corps.component';
import { CorpsDetailComponent } from './corps-detail.component';
import { CorpsUpdateComponent } from './corps-update.component';
import { CorpsDeletePopupComponent } from './corps-delete-dialog.component';
import { ICorps } from 'app/shared/model/corps.model';

@Injectable({ providedIn: 'root' })
export class CorpsResolve implements Resolve<ICorps> {
    constructor(private service: CorpsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((corps: HttpResponse<Corps>) => corps.body));
        }
        return of(new Corps());
    }
}

export const corpsRoute: Routes = [
    {
        path: 'corps',
        component: CorpsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.corps.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'corps/:id/view',
        component: CorpsDetailComponent,
        resolve: {
            corps: CorpsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.corps.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'corps/new',
        component: CorpsUpdateComponent,
        resolve: {
            corps: CorpsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.corps.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'corps/:id/edit',
        component: CorpsUpdateComponent,
        resolve: {
            corps: CorpsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.corps.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const corpsPopupRoute: Routes = [
    {
        path: 'corps/:id/delete',
        component: CorpsDeletePopupComponent,
        resolve: {
            corps: CorpsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.corps.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
