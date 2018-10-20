import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBanque } from 'app/shared/model/banque.model';
import { BanqueService } from './banque.service';

@Component({
    selector: 'jhi-banque-delete-dialog',
    templateUrl: './banque-delete-dialog.component.html'
})
export class BanqueDeleteDialogComponent {
    banque: IBanque;

    constructor(private banqueService: BanqueService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.banqueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'banqueListModification',
                content: 'Deleted an banque'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banque-delete-popup',
    template: ''
})
export class BanqueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ banque }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BanqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.banque = banque;
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
