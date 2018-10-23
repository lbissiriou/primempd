import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrimestre } from 'app/shared/model/trimestre.model';
import { TrimestreService } from './trimestre.service';

@Component({
    selector: 'jhi-trimestre-delete-dialog',
    templateUrl: './trimestre-delete-dialog.component.html'
})
export class TrimestreDeleteDialogComponent {
    trimestre: ITrimestre;

    constructor(private trimestreService: TrimestreService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trimestreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trimestreListModification',
                content: 'Deleted an trimestre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trimestre-delete-popup',
    template: ''
})
export class TrimestreDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trimestre }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrimestreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.trimestre = trimestre;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
