import { element, by, ElementFinder } from 'protractor';

export class CorpsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-corps div table .btn-danger'));
    title = element.all(by.css('jhi-corps div h2#page-heading span')).first();

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

export class CorpsUpdatePage {
    pageTitle = element(by.id('jhi-corps-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    libelleCorpsInput = element(by.id('field_libelleCorps'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLibelleCorpsInput(libelleCorps) {
        await this.libelleCorpsInput.sendKeys(libelleCorps);
    }

    async getLibelleCorpsInput() {
        return this.libelleCorpsInput.getAttribute('value');
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

export class CorpsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-corps-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-corps'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
