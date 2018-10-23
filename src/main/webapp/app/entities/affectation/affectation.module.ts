import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    AffectationComponent,
    AffectationDetailComponent,
    AffectationUpdateComponent,
    AffectationDeletePopupComponent,
    AffectationDeleteDialogComponent,
    affectationRoute,
    affectationPopupRoute
} from './';

const ENTITY_STATES = [...affectationRoute, ...affectationPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AffectationComponent,
        AffectationDetailComponent,
        AffectationUpdateComponent,
        AffectationDeleteDialogComponent,
        AffectationDeletePopupComponent
    ],
    entryComponents: [AffectationComponent, AffectationUpdateComponent, AffectationDeleteDialogComponent, AffectationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdAffectationModule {}
