/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrimempdTestModule } from '../../../test.module';
import { CorpsDeleteDialogComponent } from 'app/entities/corps/corps-delete-dialog.component';
import { CorpsService } from 'app/entities/corps/corps.service';

describe('Component Tests', () => {
    describe('Corps Management Delete Component', () => {
        let comp: CorpsDeleteDialogComponent;
        let fixture: ComponentFixture<CorpsDeleteDialogComponent>;
        let service: CorpsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [CorpsDeleteDialogComponent]
            })
                .overrideTemplate(CorpsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CorpsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CorpsService);
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
