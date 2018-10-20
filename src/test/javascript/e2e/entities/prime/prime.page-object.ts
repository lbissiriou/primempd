import { element, by, ElementFinder } from 'protractor';

export class PrimeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-prime div table .btn-danger'));
    title = element.all(by.css('jhi-prime div h2#page-heading span')).first();

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

export class PrimeUpdatePage {
    pageTitle = element(by.id('jhi-prime-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    libellePrimeInput = element(by.id('field_libellePrime'));
    tauxMensuelInput = element(by.id('field_tauxMensuel'));
    typePrimeSelect = element(by.id('field_typePrime'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLibellePrimeInput(libellePrime) {
        await this.libellePrimeInput.sendKeys(libellePrime);
    }

    async getLibellePrimeInput() {
        return this.libellePrimeInput.getAttribute('value');
    }

    async setTauxMensuelInput(tauxMensuel) {
        await this.tauxMensuelInput.sendKeys(tauxMensuel);
    }

    async getTauxMensuelInput() {
        return this.tauxMensuelInput.getAttribute('value');
    }

    async setTypePrimeSelect(typePrime) {
        await this.typePrimeSelect.sendKeys(typePrime);
    }

    async getTypePrimeSelect() {
        return this.typePrimeSelect.element(by.css('option:checked')).getText();
    }

    async typePrimeSelectLastOption() {
        await this.typePrimeSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class PrimeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-prime-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-prime'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
