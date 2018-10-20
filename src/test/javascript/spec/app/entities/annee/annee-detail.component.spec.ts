/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { AnneeDetailComponent } from 'app/entities/annee/annee-detail.component';
import { Annee } from 'app/shared/model/annee.model';

describe('Component Tests', () => {
    describe('Annee Management Detail Component', () => {
        let comp: AnneeDetailComponent;
        let fixture: ComponentFixture<AnneeDetailComponent>;
        const route = ({ data: of({ annee: new Annee(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AnneeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AnneeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnneeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.annee).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
