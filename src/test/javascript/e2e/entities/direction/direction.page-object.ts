import { element, by, ElementFinder } from 'protractor';

export class DirectionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-direction div table .btn-danger'));
    title = element.all(by.css('jhi-direction div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DirectionUpdatePage {
    pageTitle = element(by.id('jhi-direction-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    sigleInput = element(by.id('field_sigle'));
    libelleDirectionInput = element(by.id('field_libelleDirection'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSigleInput(sigle) {
        await this.sigleInput.sendKeys(sigle);
    }

    async getSigleInput() {
        return this.sigleInput.getAttribute('value');
    }

    async setLibelleDirectionInput(libelleDirection) {
        await this.libelleDirectionInput.sendKeys(libelleDirection);
    }

    async getLibelleDirectionInput() {
        return this.libelleDirectionInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class DirectionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-direction-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-direction'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
