import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrimempdBanqueModule } from './banque/banque.module';
import { PrimempdCompteModule } from './compte/compte.module';
import { PrimempdGradeModule } from './grade/grade.module';
import { PrimempdDirectionModule } from './direction/direction.module';
import { PrimempdCorpsModule } from './corps/corps.module';
import { PrimempdPrimeModule } from './prime/prime.module';
import { PrimempdTrimestreModule } from './trimestre/trimestre.module';
import { PrimempdAnneeModule } from './annee/annee.module';
import { PrimempdAgentModule } from './agent/agent.module';
import { PrimempdFonctionModule } from './fonction/fonction.module';
import { PrimempdPromotionModule } from './promotion/promotion.module';
import { PrimempdAllouerModule } from './allouer/allouer.module';
import { PrimempdAvancementModule } from './avancement/avancement.module';
import { PrimempdChangementModule } from './changement/changement.module';
import { PrimempdAffectationModule } from './affectation/affectation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PrimempdBanqueModule,
        PrimempdCompteModule,
        PrimempdGradeModule,
        PrimempdDirectionModule,
        PrimempdCorpsModule,
        PrimempdPrimeModule,
        PrimempdTrimestreModule,
        PrimempdAnneeModule,
        PrimempdAgentModule,
        PrimempdFonctionModule,
        PrimempdPromotionModule,
        PrimempdAllouerModule,
        PrimempdAvancementModule,
        PrimempdChangementModule,
        PrimempdAffectationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimempdEntityModule {}
