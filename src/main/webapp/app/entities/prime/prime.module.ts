import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    PrimeComponent,
    PrimeDetailComponent,
    PrimeUpdateComponent,
    PrimeDeletePopupComponent,
    PrimeDeleteDialogComponent,
    primeRoute,
    primePopupRoute
} from './';

const ENTITY_STATES = [...primeRoute, ...primePopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PrimeComponent, PrimeDetailComponent, PrimeUpdateComponent, PrimeDeleteDialogComponent, PrimeDeletePopupComponent],
    entryComponents: [PrimeComponent, PrimeUpdateComponent, PrimeDeleteDialogComponent, PrimeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdPrimeModule {}
