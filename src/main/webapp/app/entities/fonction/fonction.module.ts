import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    FonctionComponent,
    FonctionDetailComponent,
    FonctionUpdateComponent,
    FonctionDeletePopupComponent,
    FonctionDeleteDialogComponent,
    fonctionRoute,
    fonctionPopupRoute
} from './';

const ENTITY_STATES = [...fonctionRoute, ...fonctionPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FonctionComponent,
        FonctionDetailComponent,
        FonctionUpdateComponent,
        FonctionDeleteDialogComponent,
        FonctionDeletePopupComponent
    ],
    entryComponents: [FonctionComponent, FonctionUpdateComponent, FonctionDeleteDialogComponent, FonctionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdFonctionModule {}
