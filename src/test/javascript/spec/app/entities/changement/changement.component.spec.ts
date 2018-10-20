/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimempdTestModule } from '../../../test.module';
import { ChangementComponent } from 'app/entities/changement/changement.component';
import { ChangementService } from 'app/entities/changement/changement.service';
import { Changement } from 'app/shared/model/changement.model';

describe('Component Tests', () => {
    describe('Changement Management Component', () => {
        let comp: ChangementComponent;
        let fixture: ComponentFixture<ChangementComponent>;
        let service: ChangementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [ChangementComponent],
                providers: []
            })
                .overrideTemplate(ChangementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChangementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Changement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.changements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
