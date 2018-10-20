import { element, by, ElementFinder } from 'protractor';

export class AvancementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-avancement div table .btn-danger'));
    title = element.all(by.css('jhi-avancement div h2#page-heading span')).first();

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

export class AvancementUpdatePage {
    pageTitle = element(by.id('jhi-avancement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateDebutInput = element(by.id('field_dateDebut'));
    dateFinInput = element(by.id('field_dateFin'));
    gradeSelect = element(by.id('field_grade'));
    agentSelect = element(by.id('field_agent'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateDebutInput(dateDebut) {
        await this.dateDebutInput.sendKeys(dateDebut);
    }

    async getDateDebutInput() {
        return this.dateDebutInput.getAttribute('value');
    }

    async setDateFinInput(dateFin) {
        await this.dateFinInput.sendKeys(dateFin);
    }

    async getDateFinInput() {
        return this.dateFinInput.getAttribute('value');
    }

    async gradeSelectLastOption() {
        await this.gradeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gradeSelectOption(option) {
        await this.gradeSelect.sendKeys(option);
    }

    getGradeSelect(): ElementFinder {
        return this.gradeSelect;
    }

    async getGradeSelectedOption() {
        return this.gradeSelect.element(by.css('option:checked')).getText();
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

export class AvancementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-avancement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-avancement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
