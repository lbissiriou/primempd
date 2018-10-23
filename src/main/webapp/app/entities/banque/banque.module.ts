import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    BanqueComponent,
    BanqueDetailComponent,
    BanqueUpdateComponent,
    BanqueDeletePopupComponent,
    BanqueDeleteDialogComponent,
    banqueRoute,
    banquePopupRoute
} from './';

const ENTITY_STATES = [...banqueRoute, ...banquePopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BanqueComponent, BanqueDetailComponent, BanqueUpdateComponent, BanqueDeleteDialogComponent, BanqueDeletePopupComponent],
    entryComponents: [BanqueComponent, BanqueUpdateComponent, BanqueDeleteDialogComponent, BanqueDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdBanqueModule {}
