/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { ChangementDetailComponent } from 'app/entities/changement/changement-detail.component';
import { Changement } from 'app/shared/model/changement.model';

describe('Component Tests', () => {
    describe('Changement Management Detail Component', () => {
        let comp: ChangementDetailComponent;
        let fixture: ComponentFixture<ChangementDetailComponent>;
        const route = ({ data: of({ changement: new Changement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [ChangementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChangementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChangementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.changement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
