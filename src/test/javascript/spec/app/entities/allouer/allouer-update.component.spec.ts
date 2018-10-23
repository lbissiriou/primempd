/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrimempdTestModule } from '../../../test.module';
import { AllouerUpdateComponent } from 'app/entities/allouer/allouer-update.component';
import { AllouerService } from 'app/entities/allouer/allouer.service';
import { Allouer } from 'app/shared/model/allouer.model';

describe('Component Tests', () => {
    describe('Allouer Management Update Component', () => {
        let comp: AllouerUpdateComponent;
        let fixture: ComponentFixture<AllouerUpdateComponent>;
        let service: AllouerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [AllouerUpdateComponent]
            })
                .overrideTemplate(AllouerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AllouerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllouerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Allouer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.allouer = entity;
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
                    const entity = new Allouer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.allouer = entity;
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
