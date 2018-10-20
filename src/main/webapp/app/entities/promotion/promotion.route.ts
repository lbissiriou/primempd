import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promotion } from 'app/shared/model/promotion.model';
import { PromotionService } from './promotion.service';
import { PromotionComponent } from './promotion.component';
import { PromotionDetailComponent } from './promotion-detail.component';
import { PromotionUpdateComponent } from './promotion-update.component';
import { PromotionDeletePopupComponent } from './promotion-delete-dialog.component';
import { IPromotion } from 'app/shared/model/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromotionResolve implements Resolve<IPromotion> {
    constructor(private service: PromotionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((promotion: HttpResponse<Promotion>) => promotion.body));
        }
        return of(new Promotion());
    }
}

export const promotionRoute: Routes = [
    {
        path: 'promotion',
        component: PromotionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.promotion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'promotion/:id/view',
        component: PromotionDetailComponent,
        resolve: {
            promotion: PromotionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.promotion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'promotion/new',
        component: PromotionUpdateComponent,
        resolve: {
            promotion: PromotionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.promotion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'promotion/:id/edit',
        component: PromotionUpdateComponent,
        resolve: {
            promotion: PromotionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.promotion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const promotionPopupRoute: Routes = [
    {
        path: 'promotion/:id/delete',
        component: PromotionDeletePopupComponent,
        resolve: {
            promotion: PromotionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'primempdApp.promotion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
