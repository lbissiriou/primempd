import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    CompteComponent,
    CompteDetailComponent,
    CompteUpdateComponent,
    CompteDeletePopupComponent,
    CompteDeleteDialogComponent,
    compteRoute,
    comptePopupRoute
} from './';

const ENTITY_STATES = [...compteRoute, ...comptePopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CompteComponent, CompteDetailComponent, CompteUpdateComponent, CompteDeleteDialogComponent, CompteDeletePopupComponent],
    entryComponents: [CompteComponent, CompteUpdateComponent, CompteDeleteDialogComponent, CompteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdCompteModule {}
