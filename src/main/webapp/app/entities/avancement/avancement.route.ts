import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Avancement } from 'app/shared/model/avancement.model';
import { AvancementService } from './avancement.service';
import { AvancementComponent } from './avancement.component';
import { AvancementDetailComponent } from './avancement-detail.component';
import { AvancementUpdateComponent } from './avancement-update.component';
import { AvancementDeletePopupComponent } from './avancement-delete-dialog.component';
import { IAvancement } from 'app/shared/model/avancement.model';

@Injectable({ providedIn: 'root' })
export class AvancementResolve implements Resolve<IAvancement> {
    constructor(private service: AvancementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((avancement: HttpResponse<Avancement>) => avancement.body));
        }
        return of(new Avancement());
    }
}

export const avancementRoute: Routes = [
    {
        path: 'avancement',
        component: AvancementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.avancement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'avancement/:id/view',
        component: AvancementDetailComponent,
        resolve: {
            avancement: AvancementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.avancement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'avancement/new',
        component: AvancementUpdateComponent,
        resolve: {
            avancement: AvancementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.avancement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'avancement/:id/edit',
        component: AvancementUpdateComponent,
        resolve: {
            avancement: AvancementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.avancement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const avancementPopupRoute: Routes = [
    {
        path: 'avancement/:id/delete',
        component: AvancementDeletePopupComponent,
        resolve: {
            avancement: AvancementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.avancement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
