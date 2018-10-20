import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trimestre } from 'app/shared/model/trimestre.model';
import { TrimestreService } from './trimestre.service';
import { TrimestreComponent } from './trimestre.component';
import { TrimestreDetailComponent } from './trimestre-detail.component';
import { TrimestreUpdateComponent } from './trimestre-update.component';
import { TrimestreDeletePopupComponent } from './trimestre-delete-dialog.component';
import { ITrimestre } from 'app/shared/model/trimestre.model';

@Injectable({ providedIn: 'root' })
export class TrimestreResolve implements Resolve<ITrimestre> {
    constructor(private service: TrimestreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((trimestre: HttpResponse<Trimestre>) => trimestre.body));
        }
        return of(new Trimestre());
    }
}

export const trimestreRoute: Routes = [
    {
        path: 'trimestre',
        component: TrimestreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.trimestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trimestre/:id/view',
        component: TrimestreDetailComponent,
        resolve: {
            trimestre: TrimestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.trimestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trimestre/new',
        component: TrimestreUpdateComponent,
        resolve: {
            trimestre: TrimestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.trimestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trimestre/:id/edit',
        component: TrimestreUpdateComponent,
        resolve: {
            trimestre: TrimestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.trimestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trimestrePopupRoute: Routes = [
    {
        path: 'trimestre/:id/delete',
        component: TrimestreDeletePopupComponent,
        resolve: {
            trimestre: TrimestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.trimestre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
