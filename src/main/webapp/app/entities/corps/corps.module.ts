import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    CorpsComponent,
    CorpsDetailComponent,
    CorpsUpdateComponent,
    CorpsDeletePopupComponent,
    CorpsDeleteDialogComponent,
    corpsRoute,
    corpsPopupRoute
} from './';

const ENTITY_STATES = [...corpsRoute, ...corpsPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CorpsComponent, CorpsDetailComponent, CorpsUpdateComponent, CorpsDeleteDialogComponent, CorpsDeletePopupComponent],
    entryComponents: [CorpsComponent, CorpsUpdateComponent, CorpsDeleteDialogComponent, CorpsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdCorpsModule {}
