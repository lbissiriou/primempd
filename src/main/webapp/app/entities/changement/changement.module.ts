import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    ChangementComponent,
    ChangementDetailComponent,
    ChangementUpdateComponent,
    ChangementDeletePopupComponent,
    ChangementDeleteDialogComponent,
    changementRoute,
    changementPopupRoute
} from './';

const ENTITY_STATES = [...changementRoute, ...changementPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChangementComponent,
        ChangementDetailComponent,
        ChangementUpdateComponent,
        ChangementDeleteDialogComponent,
        ChangementDeletePopupComponent
    ],
    entryComponents: [ChangementComponent, ChangementUpdateComponent, ChangementDeleteDialogComponent, ChangementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdChangementModule {}
