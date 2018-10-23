import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    AllouerComponent,
    AllouerDetailComponent,
    AllouerUpdateComponent,
    AllouerDeletePopupComponent,
    AllouerDeleteDialogComponent,
    allouerRoute,
    allouerPopupRoute
} from './';

const ENTITY_STATES = [...allouerRoute, ...allouerPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AllouerComponent,
        AllouerDetailComponent,
        AllouerUpdateComponent,
        AllouerDeleteDialogComponent,
        AllouerDeletePopupComponent
    ],
    entryComponents: [AllouerComponent, AllouerUpdateComponent, AllouerDeleteDialogComponent, AllouerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdAllouerModule {}
