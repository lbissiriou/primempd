import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    AnneeComponent,
    AnneeDetailComponent,
    AnneeUpdateComponent,
    AnneeDeletePopupComponent,
    AnneeDeleteDialogComponent,
    anneeRoute,
    anneePopupRoute
} from './';

const ENTITY_STATES = [...anneeRoute, ...anneePopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AnneeComponent, AnneeDetailComponent, AnneeUpdateComponent, AnneeDeleteDialogComponent, AnneeDeletePopupComponent],
    entryComponents: [AnneeComponent, AnneeUpdateComponent, AnneeDeleteDialogComponent, AnneeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdAnneeModule {}
