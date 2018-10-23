import { element, by, ElementFinder } from 'protractor';

export class BanqueComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-banque div table .btn-danger'));
    title = element.all(by.css('jhi-banque div h2#page-heading span')).first();

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

export class BanqueUpdatePage {
    pageTitle = element(by.id('jhi-banque-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeBanqueInput = element(by.id('field_codeBanque'));
    nomBanqueInput = element(by.id('field_nomBanque'));
    siegeSocialInput = element(by.id('field_siegeSocial'));
    telephoneInput = element(by.id('field_telephone'));
    faxInput = element(by.id('field_fax'));
    emailInput = element(by.id('field_email'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeBanqueInput(codeBanque) {
        await this.codeBanqueInput.sendKeys(codeBanque);
    }

    async getCodeBanqueInput() {
        return this.codeBanqueInput.getAttribute('value');
    }

    async setNomBanqueInput(nomBanque) {
        await this.nomBanqueInput.sendKeys(nomBanque);
    }

    async getNomBanqueInput() {
        return this.nomBanqueInput.getAttribute('value');
    }

    async setSiegeSocialInput(siegeSocial) {
        await this.siegeSocialInput.sendKeys(siegeSocial);
    }

    async getSiegeSocialInput() {
        return this.siegeSocialInput.getAttribute('value');
    }

    async setTelephoneInput(telephone) {
        await this.telephoneInput.sendKeys(telephone);
    }

    async getTelephoneInput() {
        return this.telephoneInput.getAttribute('value');
    }

    async setFaxInput(fax) {
        await this.faxInput.sendKeys(fax);
    }

    async getFaxInput() {
        return this.faxInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
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

export class BanqueDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-banque-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-banque'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
