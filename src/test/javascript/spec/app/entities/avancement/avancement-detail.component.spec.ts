/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { AvancementDetailComponent } from 'app/entities/avancement/avancement-detail.component';
import { Avancement } from 'app/shared/model/avancement.model';

describe('Component Tests', () => {
    describe('Avancement Management Detail Component', () => {
        let comp: AvancementDetailComponent;
        let fixture: ComponentFixture<AvancementDetailComponent>;
        const route = ({ data: of({ avancement: new Avancement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AvancementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AvancementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AvancementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.avancement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
