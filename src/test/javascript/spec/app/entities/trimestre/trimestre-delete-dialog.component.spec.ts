/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrimempdTestModule } from '../../../test.module';
import { TrimestreDeleteDialogComponent } from 'app/entities/trimestre/trimestre-delete-dialog.component';
import { TrimestreService } from 'app/entities/trimestre/trimestre.service';

describe('Component Tests', () => {
    describe('Trimestre Management Delete Component', () => {
        let comp: TrimestreDeleteDialogComponent;
        let fixture: ComponentFixture<TrimestreDeleteDialogComponent>;
        let service: TrimestreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrimempdTestModule],
                declarations: [TrimestreDeleteDialogComponent]
            })
                .overrideTemplate(TrimestreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrimestreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrimestreService);
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
