import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgentComponentsPage, AgentDeleteDialog, AgentUpdatePage } from './agent.page-object';

describe('Agent e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let agentUpdatePage: AgentUpdatePage;
    let agentComponentsPage: AgentComponentsPage;
    let agentDeleteDialog: AgentDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Agents', async () => {
        await navBarPage.goToEntity('agent');
        agentComponentsPage = new AgentComponentsPage();
        expect(await agentComponentsPage.getTitle()).toMatch(/primempdApp.agent.home.title/);
    });

    it('should load create Agent page', async () => {
        await agentComponentsPage.clickOnCreateButton();
        agentUpdatePage = new AgentUpdatePage();
        expect(await agentUpdatePage.getPageTitle()).toMatch(/primempdApp.agent.home.createOrEditLabel/);
        await agentUpdatePage.cancel();
    });

    it('should create and save Agents', async () => {
        await agentComponentsPage.clickOnCreateButton();
        await agentUpdatePage.setMatriculeInput('5');
        expect(await agentUpdatePage.getMatriculeInput()).toMatch('5');
        await agentUpdatePage.setNomInput('nom');
        expect(await agentUpdatePage.getNomInput()).toMatch('nom');
        await agentUpdatePage.setPrenomsInput('prenoms');
        expect(await agentUpdatePage.getPrenomsInput()).toMatch('prenoms');
        await agentUpdatePage.setDateNaissInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await agentUpdatePage.getDateNaissInput()).toContain('2001-01-01T02:30');
        await agentUpdatePage.setLieuNaissInput('lieuNaiss');
        expect(await agentUpdatePage.getLieuNaissInput()).toMatch('lieuNaiss');
        await agentUpdatePage.setContactInput('contact');
        expect(await agentUpdatePage.getContactInput()).toMatch('contact');
        await agentUpdatePage.setEmailInput('email');
        expect(await agentUpdatePage.getEmailInput()).toMatch('email');
        await agentUpdatePage.setAdresseInput('adresse');
        expect(await agentUpdatePage.getAdresseInput()).toMatch('adresse');
        await agentUpdatePage.setDatePriseServInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await agentUpdatePage.getDatePriseServInput()).toContain('2001-01-01T02:30');
        await agentUpdatePage.situationMatrimSelectLastOption();
        await agentUpdatePage.setNombreEnftsInput('5');
        expect(await agentUpdatePage.getNombreEnftsInput()).toMatch('5');
        await agentUpdatePage.statutSelectLastOption();
        await agentUpdatePage.fonctionActuelleSelectLastOption();
        await agentUpdatePage.compteactuelSelectLastOption();
        await agentUpdatePage.directionactuelleSelectLastOption();
        await agentUpdatePage.gradeactuelSelectLastOption();
        await agentUpdatePage.corpsactuelSelectLastOption();
        await agentUpdatePage.save();
        expect(await agentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Agent', async () => {
        const nbButtonsBeforeDelete = await agentComponentsPage.countDeleteButtons();
        await agentComponentsPage.clickOnLastDeleteButton();

        agentDeleteDialog = new AgentDeleteDialog();
        expect(await agentDeleteDialog.getDialogTitle()).toMatch(/primempdApp.agent.delete.question/);
        await agentDeleteDialog.clickOnConfirmButton();

        expect(await agentComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
