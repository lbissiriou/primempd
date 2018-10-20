import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFonction } from 'app/shared/model/fonction.model';
import { FonctionService } from './fonction.service';

@Component({
    selector: 'jhi-fonction-delete-dialog',
    templateUrl: './fonction-delete-dialog.component.html'
})
export class FonctionDeleteDialogComponent {
    fonction: IFonction;

    constructor(private fonctionService: FonctionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fonctionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fonctionListModification',
                content: 'Deleted an fonction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fonction-delete-popup',
    template: ''
})
export class FonctionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fonction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FonctionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.fonction = fonction;
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
