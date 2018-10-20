/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimempdTestModule } from '../../../test.module';
import { TrimestreComponent } from 'app/entities/trimestre/trimestre.component';
import { TrimestreService } from 'app/entities/trimestre/trimestre.service';
import { Trimestre } from 'app/shared/model/trimestre.model';

describe('Component Tests', () => {
    describe('Trimestre Management Component', () => {
        let comp: TrimestreComponent;
        let fixture: ComponentFixture<TrimestreComponent>;
        let service: TrimestreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [TrimestreComponent],
                providers: []
            })
                .overrideTemplate(TrimestreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrimestreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrimestreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Trimestre(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trimestres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
