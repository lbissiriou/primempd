/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimempdTestModule } from '../../../test.module';
import { AnneeComponent } from 'app/entities/annee/annee.component';
import { AnneeService } from 'app/entities/annee/annee.service';
import { Annee } from 'app/shared/model/annee.model';

describe('Component Tests', () => {
    describe('Annee Management Component', () => {
        let comp: AnneeComponent;
        let fixture: ComponentFixture<AnneeComponent>;
        let service: AnneeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AnneeComponent],
                providers: []
            })
                .overrideTemplate(AnneeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnneeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnneeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Annee(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.annees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
