import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    TrimestreComponent,
    TrimestreDetailComponent,
    TrimestreUpdateComponent,
    TrimestreDeletePopupComponent,
    TrimestreDeleteDialogComponent,
    trimestreRoute,
    trimestrePopupRoute
} from './';

const ENTITY_STATES = [...trimestreRoute, ...trimestrePopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrimestreComponent,
        TrimestreDetailComponent,
        TrimestreUpdateComponent,
        TrimestreDeleteDialogComponent,
        TrimestreDeletePopupComponent
    ],
    entryComponents: [TrimestreComponent, TrimestreUpdateComponent, TrimestreDeleteDialogComponent, TrimestreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdTrimestreModule {}
