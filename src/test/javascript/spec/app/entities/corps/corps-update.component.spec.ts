/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { CorpsUpdateComponent } from 'app/entities/corps/corps-update.component';
import { CorpsService } from 'app/entities/corps/corps.service';
import { Corps } from 'app/shared/model/corps.model';

describe('Component Tests', () => {
    describe('Corps Management Update Component', () => {
        let comp: CorpsUpdateComponent;
        let fixture: ComponentFixture<CorpsUpdateComponent>;
        let service: CorpsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [CorpsUpdateComponent]
            })
                .overrideTemplate(CorpsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CorpsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorpsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Corps(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.corps = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Corps();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.corps = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
