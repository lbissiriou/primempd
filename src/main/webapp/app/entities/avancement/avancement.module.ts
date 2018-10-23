import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    AvancementComponent,
    AvancementDetailComponent,
    AvancementUpdateComponent,
    AvancementDeletePopupComponent,
    AvancementDeleteDialogComponent,
    avancementRoute,
    avancementPopupRoute
} from './';

const ENTITY_STATES = [...avancementRoute, ...avancementPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AvancementComponent,
        AvancementDetailComponent,
        AvancementUpdateComponent,
        AvancementDeleteDialogComponent,
        AvancementDeletePopupComponent
    ],
    entryComponents: [AvancementComponent, AvancementUpdateComponent, AvancementDeleteDialogComponent, AvancementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdAvancementModule {}
