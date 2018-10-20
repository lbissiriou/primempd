import { element, by, ElementFinder } from 'protractor';

export class ChangementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-changement div table .btn-danger'));
    title = element.all(by.css('jhi-changement div h2#page-heading span')).first();

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

export class ChangementUpdatePage {
    pageTitle = element(by.id('jhi-changement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateDebutInput = element(by.id('field_dateDebut'));
    datefinInput = element(by.id('field_datefin'));
    agentSelect = element(by.id('field_agent'));
    corpsSelect = element(by.id('field_corps'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateDebutInput(dateDebut) {
        await this.dateDebutInput.sendKeys(dateDebut);
    }

    async getDateDebutInput() {
        return this.dateDebutInput.getAttribute('value');
    }

    async setDatefinInput(datefin) {
        await this.datefinInput.sendKeys(datefin);
    }

    async getDatefinInput() {
        return this.datefinInput.getAttribute('value');
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

    async corpsSelectLastOption() {
        await this.corpsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async corpsSelectOption(option) {
        await this.corpsSelect.sendKeys(option);
    }

    getCorpsSelect(): ElementFinder {
        return this.corpsSelect;
    }

    async getCorpsSelectedOption() {
        return this.corpsSelect.element(by.css('option:checked')).getText();
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

export class ChangementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-changement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-changement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
