/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { AvancementUpdateComponent } from 'app/entities/avancement/avancement-update.component';
import { AvancementService } from 'app/entities/avancement/avancement.service';
import { Avancement } from 'app/shared/model/avancement.model';

describe('Component Tests', () => {
    describe('Avancement Management Update Component', () => {
        let comp: AvancementUpdateComponent;
        let fixture: ComponentFixture<AvancementUpdateComponent>;
        let service: AvancementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AvancementUpdateComponent]
            })
                .overrideTemplate(AvancementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AvancementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AvancementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Avancement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.avancement = entity;
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
                    const entity = new Avancement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.avancement = entity;
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
