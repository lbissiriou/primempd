import { element, by, ElementFinder } from 'protractor';

export class AnneeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-annee div table .btn-danger'));
    title = element.all(by.css('jhi-annee div h2#page-heading span')).first();

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

export class AnneeUpdatePage {
    pageTitle = element(by.id('jhi-annee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeAnneeInput = element(by.id('field_codeAnnee'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeAnneeInput(codeAnnee) {
        await this.codeAnneeInput.sendKeys(codeAnnee);
    }

    async getCodeAnneeInput() {
        return this.codeAnneeInput.getAttribute('value');
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

export class AnneeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-annee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-annee'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
