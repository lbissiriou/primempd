import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Direction } from 'app/shared/model/direction.model';
import { DirectionService } from './direction.service';
import { DirectionComponent } from './direction.component';
import { DirectionDetailComponent } from './direction-detail.component';
import { DirectionUpdateComponent } from './direction-update.component';
import { DirectionDeletePopupComponent } from './direction-delete-dialog.component';
import { IDirection } from 'app/shared/model/direction.model';

@Injectable({ providedIn: 'root' })
export class DirectionResolve implements Resolve<IDirection> {
    constructor(private service: DirectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((direction: HttpResponse<Direction>) => direction.body));
        }
        return of(new Direction());
    }
}

export const directionRoute: Routes = [
    {
        path: 'direction',
        component: DirectionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.direction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direction/:id/view',
        component: DirectionDetailComponent,
        resolve: {
            direction: DirectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.direction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direction/new',
        component: DirectionUpdateComponent,
        resolve: {
            direction: DirectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.direction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direction/:id/edit',
        component: DirectionUpdateComponent,
        resolve: {
            direction: DirectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.direction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const directionPopupRoute: Routes = [
    {
        path: 'direction/:id/delete',
        component: DirectionDeletePopupComponent,
        resolve: {
            direction: DirectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.direction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
