import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    DirectionComponent,
    DirectionDetailComponent,
    DirectionUpdateComponent,
    DirectionDeletePopupComponent,
    DirectionDeleteDialogComponent,
    directionRoute,
    directionPopupRoute
} from './';

const ENTITY_STATES = [...directionRoute, ...directionPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DirectionComponent,
        DirectionDetailComponent,
        DirectionUpdateComponent,
        DirectionDeleteDialogComponent,
        DirectionDeletePopupComponent
    ],
    entryComponents: [DirectionComponent, DirectionUpdateComponent, DirectionDeleteDialogComponent, DirectionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdDirectionModule {}
