/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { AllouerDetailComponent } from 'app/entities/allouer/allouer-detail.component';
import { Allouer } from 'app/shared/model/allouer.model';

describe('Component Tests', () => {
    describe('Allouer Management Detail Component', () => {
        let comp: AllouerDetailComponent;
        let fixture: ComponentFixture<AllouerDetailComponent>;
        const route = ({ data: of({ allouer: new Allouer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AllouerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AllouerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AllouerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.allouer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
