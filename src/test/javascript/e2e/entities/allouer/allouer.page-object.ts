import { element, by, ElementFinder } from 'protractor';

export class AllouerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-allouer div table .btn-danger'));
    title = element.all(by.css('jhi-allouer div h2#page-heading span')).first();

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

export class AllouerUpdatePage {
    pageTitle = element(by.id('jhi-allouer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    noteInput = element(by.id('field_note'));
    nombreJoursInput = element(by.id('field_nombreJours'));
    montantInput = element(by.id('field_montant'));
    agentSelect = element(by.id('field_agent'));
    primeSelect = element(by.id('field_prime'));
    anneeSelect = element(by.id('field_annee'));
    trimestreSelect = element(by.id('field_trimestre'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async setNombreJoursInput(nombreJours) {
        await this.nombreJoursInput.sendKeys(nombreJours);
    }

    async getNombreJoursInput() {
        return this.nombreJoursInput.getAttribute('value');
    }

    async setMontantInput(montant) {
        await this.montantInput.sendKeys(montant);
    }

    async getMontantInput() {
        return this.montantInput.getAttribute('value');
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

    async primeSelectLastOption() {
        await this.primeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async primeSelectOption(option) {
        await this.primeSelect.sendKeys(option);
    }

    getPrimeSelect(): ElementFinder {
        return this.primeSelect;
    }

    async getPrimeSelectedOption() {
        return this.primeSelect.element(by.css('option:checked')).getText();
    }

    async anneeSelectLastOption() {
        await this.anneeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async anneeSelectOption(option) {
        await this.anneeSelect.sendKeys(option);
    }

    getAnneeSelect(): ElementFinder {
        return this.anneeSelect;
    }

    async getAnneeSelectedOption() {
        return this.anneeSelect.element(by.css('option:checked')).getText();
    }

    async trimestreSelectLastOption() {
        await this.trimestreSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async trimestreSelectOption(option) {
        await this.trimestreSelect.sendKeys(option);
    }

    getTrimestreSelect(): ElementFinder {
        return this.trimestreSelect;
    }

    async getTrimestreSelectedOption() {
        return this.trimestreSelect.element(by.css('option:checked')).getText();
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

export class AllouerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-allouer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-allouer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
