/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { CorpsDetailComponent } from 'app/entities/corps/corps-detail.component';
import { Corps } from 'app/shared/model/corps.model';

describe('Component Tests', () => {
    describe('Corps Management Detail Component', () => {
        let comp: CorpsDetailComponent;
        let fixture: ComponentFixture<CorpsDetailComponent>;
        const route = ({ data: of({ corps: new Corps(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [CorpsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CorpsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorpsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.corps).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
