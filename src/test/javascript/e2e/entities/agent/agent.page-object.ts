import { element, by, ElementFinder } from 'protractor';

export class AgentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-agent div table .btn-danger'));
    title = element.all(by.css('jhi-agent div h2#page-heading span')).first();

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

export class AgentUpdatePage {
    pageTitle = element(by.id('jhi-agent-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    matriculeInput = element(by.id('field_matricule'));
    nomInput = element(by.id('field_nom'));
    prenomsInput = element(by.id('field_prenoms'));
    dateNaissInput = element(by.id('field_dateNaiss'));
    lieuNaissInput = element(by.id('field_lieuNaiss'));
    contactInput = element(by.id('field_contact'));
    emailInput = element(by.id('field_email'));
    adresseInput = element(by.id('field_adresse'));
    datePriseServInput = element(by.id('field_datePriseServ'));
    situationMatrimSelect = element(by.id('field_situationMatrim'));
    nombreEnftsInput = element(by.id('field_nombreEnfts'));
    statutSelect = element(by.id('field_statut'));
    fonctionActuelleSelect = element(by.id('field_fonctionActuelle'));
    compteactuelSelect = element(by.id('field_compteactuel'));
    directionactuelleSelect = element(by.id('field_directionactuelle'));
    gradeactuelSelect = element(by.id('field_gradeactuel'));
    corpsactuelSelect = element(by.id('field_corpsactuel'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMatriculeInput(matricule) {
        await this.matriculeInput.sendKeys(matricule);
    }

    async getMatriculeInput() {
        return this.matriculeInput.getAttribute('value');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomsInput(prenoms) {
        await this.prenomsInput.sendKeys(prenoms);
    }

    async getPrenomsInput() {
        return this.prenomsInput.getAttribute('value');
    }

    async setDateNaissInput(dateNaiss) {
        await this.dateNaissInput.sendKeys(dateNaiss);
    }

    async getDateNaissInput() {
        return this.dateNaissInput.getAttribute('value');
    }

    async setLieuNaissInput(lieuNaiss) {
        await this.lieuNaissInput.sendKeys(lieuNaiss);
    }

    async getLieuNaissInput() {
        return this.lieuNaissInput.getAttribute('value');
    }

    async setContactInput(contact) {
        await this.contactInput.sendKeys(contact);
    }

    async getContactInput() {
        return this.contactInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setAdresseInput(adresse) {
        await this.adresseInput.sendKeys(adresse);
    }

    async getAdresseInput() {
        return this.adresseInput.getAttribute('value');
    }

    async setDatePriseServInput(datePriseServ) {
        await this.datePriseServInput.sendKeys(datePriseServ);
    }

    async getDatePriseServInput() {
        return this.datePriseServInput.getAttribute('value');
    }

    async setSituationMatrimSelect(situationMatrim) {
        await this.situationMatrimSelect.sendKeys(situationMatrim);
    }

    async getSituationMatrimSelect() {
        return this.situationMatrimSelect.element(by.css('option:checked')).getText();
    }

    async situationMatrimSelectLastOption() {
        await this.situationMatrimSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNombreEnftsInput(nombreEnfts) {
        await this.nombreEnftsInput.sendKeys(nombreEnfts);
    }

    async getNombreEnftsInput() {
        return this.nombreEnftsInput.getAttribute('value');
    }

    async setStatutSelect(statut) {
        await this.statutSelect.sendKeys(statut);
    }

    async getStatutSelect() {
        return this.statutSelect.element(by.css('option:checked')).getText();
    }

    async statutSelectLastOption() {
        await this.statutSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fonctionActuelleSelectLastOption() {
        await this.fonctionActuelleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fonctionActuelleSelectOption(option) {
        await this.fonctionActuelleSelect.sendKeys(option);
    }

    getFonctionActuelleSelect(): ElementFinder {
        return this.fonctionActuelleSelect;
    }

    async getFonctionActuelleSelectedOption() {
        return this.fonctionActuelleSelect.element(by.css('option:checked')).getText();
    }

    async compteactuelSelectLastOption() {
        await this.compteactuelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async compteactuelSelectOption(option) {
        await this.compteactuelSelect.sendKeys(option);
    }

    getCompteactuelSelect(): ElementFinder {
        return this.compteactuelSelect;
    }

    async getCompteactuelSelectedOption() {
        return this.compteactuelSelect.element(by.css('option:checked')).getText();
    }

    async directionactuelleSelectLastOption() {
        await this.directionactuelleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async directionactuelleSelectOption(option) {
        await this.directionactuelleSelect.sendKeys(option);
    }

    getDirectionactuelleSelect(): ElementFinder {
        return this.directionactuelleSelect;
    }

    async getDirectionactuelleSelectedOption() {
        return this.directionactuelleSelect.element(by.css('option:checked')).getText();
    }

    async gradeactuelSelectLastOption() {
        await this.gradeactuelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gradeactuelSelectOption(option) {
        await this.gradeactuelSelect.sendKeys(option);
    }

    getGradeactuelSelect(): ElementFinder {
        return this.gradeactuelSelect;
    }

    async getGradeactuelSelectedOption() {
        return this.gradeactuelSelect.element(by.css('option:checked')).getText();
    }

    async corpsactuelSelectLastOption() {
        await this.corpsactuelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async corpsactuelSelectOption(option) {
        await this.corpsactuelSelect.sendKeys(option);
    }

    getCorpsactuelSelect(): ElementFinder {
        return this.corpsactuelSelect;
    }

    async getCorpsactuelSelectedOption() {
        return this.corpsactuelSelect.element(by.css('option:checked')).getText();
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

export class AgentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-agent-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-agent'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
