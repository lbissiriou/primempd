import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    PromotionComponent,
    PromotionDetailComponent,
    PromotionUpdateComponent,
    PromotionDeletePopupComponent,
    PromotionDeleteDialogComponent,
    promotionRoute,
    promotionPopupRoute
} from './';

const ENTITY_STATES = [...promotionRoute, ...promotionPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PromotionComponent,
        PromotionDetailComponent,
        PromotionUpdateComponent,
        PromotionDeleteDialogComponent,
        PromotionDeletePopupComponent
    ],
    entryComponents: [PromotionComponent, PromotionUpdateComponent, PromotionDeleteDialogComponent, PromotionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdPromotionModule {}
