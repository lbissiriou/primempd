import { element, by, ElementFinder } from 'protractor';

export class TrimestreComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-trimestre div table .btn-danger'));
    title = element.all(by.css('jhi-trimestre div h2#page-heading span')).first();

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

export class TrimestreUpdatePage {
    pageTitle = element(by.id('jhi-trimestre-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeTrimestreInput = element(by.id('field_codeTrimestre'));
    trimestreInput = element(by.id('field_trimestre'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeTrimestreInput(codeTrimestre) {
        await this.codeTrimestreInput.sendKeys(codeTrimestre);
    }

    async getCodeTrimestreInput() {
        return this.codeTrimestreInput.getAttribute('value');
    }

    async setTrimestreInput(trimestre) {
        await this.trimestreInput.sendKeys(trimestre);
    }

    async getTrimestreInput() {
        return this.trimestreInput.getAttribute('value');
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

export class TrimestreDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-trimestre-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-trimestre'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
