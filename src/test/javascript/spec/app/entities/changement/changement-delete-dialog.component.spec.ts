/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrimempdTestModule } from '../../../test.module';
import { ChangementDeleteDialogComponent } from 'app/entities/changement/changement-delete-dialog.component';
import { ChangementService } from 'app/entities/changement/changement.service';

describe('Component Tests', () => {
    describe('Changement Management Delete Component', () => {
        let comp: ChangementDeleteDialogComponent;
        let fixture: ComponentFixture<ChangementDeleteDialogComponent>;
        let service: ChangementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [ChangementDeleteDialogComponent]
            })
                .overrideTemplate(ChangementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChangementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
