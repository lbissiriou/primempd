import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimempdSharedModule } from 'app/shared';
import {
    AgentComponent,
    AgentDetailComponent,
    AgentUpdateComponent,
    AgentDeletePopupComponent,
    AgentDeleteDialogComponent,
    agentRoute,
    agentPopupRoute
} from './';

const ENTITY_STATES = [...agentRoute, ...agentPopupRoute];

@NgModule({
    imports: [PrimempdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AgentComponent, AgentDetailComponent, AgentUpdateComponent, AgentDeleteDialogComponent, AgentDeletePopupComponent],
    entryComponents: [AgentComponent, AgentUpdateComponent, AgentDeleteDialogComponent, AgentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdAgentModule {}
