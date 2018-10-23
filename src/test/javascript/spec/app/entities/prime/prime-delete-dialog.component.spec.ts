/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrimempdTestModule } from '../../../test.module';
import { PrimeDeleteDialogComponent } from 'app/entities/prime/prime-delete-dialog.component';
import { PrimeService } from 'app/entities/prime/prime.service';

describe('Component Tests', () => {
    describe('Prime Management Delete Component', () => {
        let comp: PrimeDeleteDialogComponent;
        let fixture: ComponentFixture<PrimeDeleteDialogComponent>;
        let service: PrimeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [PrimeDeleteDialogComponent]
            })
                .overrideTemplate(PrimeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrimeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrimeService);
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
