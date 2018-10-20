/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimempdTestModule } from '../../../test.module';
import { FonctionComponent } from 'app/entities/fonction/fonction.component';
import { FonctionService } from 'app/entities/fonction/fonction.service';
import { Fonction } from 'app/shared/model/fonction.model';

describe('Component Tests', () => {
    describe('Fonction Management Component', () => {
        let comp: FonctionComponent;
        let fixture: ComponentFixture<FonctionComponent>;
        let service: FonctionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [FonctionComponent],
                providers: []
            })
                .overrideTemplate(FonctionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FonctionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FonctionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Fonction(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fonctions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
