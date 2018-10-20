/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimempdTestModule } from '../../../test.module';
import { CorpsComponent } from 'app/entities/corps/corps.component';
import { CorpsService } from 'app/entities/corps/corps.service';
import { Corps } from 'app/shared/model/corps.model';

describe('Component Tests', () => {
    describe('Corps Management Component', () => {
        let comp: CorpsComponent;
        let fixture: ComponentFixture<CorpsComponent>;
        let service: CorpsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [CorpsComponent],
                providers: []
            })
                .overrideTemplate(CorpsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CorpsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorpsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Corps(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.corps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
