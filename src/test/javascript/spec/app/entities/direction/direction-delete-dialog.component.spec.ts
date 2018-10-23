/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrimempdTestModule } from '../../../test.module';
import { DirectionDeleteDialogComponent } from 'app/entities/direction/direction-delete-dialog.component';
import { DirectionService } from 'app/entities/direction/direction.service';

describe('Component Tests', () => {
    describe('Direction Management Delete Component', () => {
        let comp: DirectionDeleteDialogComponent;
        let fixture: ComponentFixture<DirectionDeleteDialogComponent>;
        let service: DirectionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [DirectionDeleteDialogComponent]
            })
                .overrideTemplate(DirectionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DirectionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirectionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
