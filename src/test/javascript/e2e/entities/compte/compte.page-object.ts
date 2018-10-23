import { element, by, ElementFinder } from 'protractor';

export class CompteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-compte div table .btn-danger'));
    title = element.all(by.css('jhi-compte div h2#page-heading span')).first();

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

export class CompteUpdatePage {
    pageTitle = element(by.id('jhi-compte-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numeroCompteInput = element(by.id('field_numeroCompte'));
    banqueSelect = element(by.id('field_banque'));
    agentSelect = element(by.id('field_agent'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumeroCompteInput(numeroCompte) {
        await this.numeroCompteInput.sendKeys(numeroCompte);
    }

    async getNumeroCompteInput() {
        return this.numeroCompteInput.getAttribute('value');
    }

    async banqueSelectLastOption() {
        await this.banqueSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async banqueSelectOption(option) {
        await this.banqueSelect.sendKeys(option);
    }

    getBanqueSelect(): ElementFinder {
        return this.banqueSelect;
    }

    async getBanqueSelectedOption() {
        return this.banqueSelect.element(by.css('option:checked')).getText();
    }

    async agentSelectLastOption() {
        await this.agentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async agentSelectOption(option) {
        await this.agentSelect.sendKeys(option);
    }

    getAgentSelect(): ElementFinder {
        return this.agentSelect;
    }

    async getAgentSelectedOption() {
        return this.agentSelect.element(by.css('option:checked')).getText();
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

export class CompteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-compte-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-compte'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
