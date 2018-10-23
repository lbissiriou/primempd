/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { TrimestreDetailComponent } from 'app/entities/trimestre/trimestre-detail.component';
import { Trimestre } from 'app/shared/model/trimestre.model';

describe('Component Tests', () => {
    describe('Trimestre Management Detail Component', () => {
        let comp: TrimestreDetailComponent;
        let fixture: ComponentFixture<TrimestreDetailComponent>;
        const route = ({ data: of({ trimestre: new Trimestre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [TrimestreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrimestreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrimestreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trimestre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
