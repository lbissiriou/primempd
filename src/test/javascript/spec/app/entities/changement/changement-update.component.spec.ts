/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { ChangementUpdateComponent } from 'app/entities/changement/changement-update.component';
import { ChangementService } from 'app/entities/changement/changement.service';
import { Changement } from 'app/shared/model/changement.model';

describe('Component Tests', () => {
    describe('Changement Management Update Component', () => {
        let comp: ChangementUpdateComponent;
        let fixture: ComponentFixture<ChangementUpdateComponent>;
        let service: ChangementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [ChangementUpdateComponent]
            })
                .overrideTemplate(ChangementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChangementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Changement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.changement = entity;
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
                    const entity = new Changement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.changement = entity;
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
