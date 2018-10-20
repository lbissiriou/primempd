import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AvancementComponentsPage, AvancementDeleteDialog, AvancementUpdatePage } from './avancement.page-object';

describe('Avancement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let avancementUpdatePage: AvancementUpdatePage;
    let avancementComponentsPage: AvancementComponentsPage;
    let avancementDeleteDialog: AvancementDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Avancements', async () => {
        await navBarPage.goToEntity('avancement');
        avancementComponentsPage = new AvancementComponentsPage();
        expect(await avancementComponentsPage.getTitle()).toMatch(/primempdApp.avancement.home.title/);
    });

    it('should load create Avancement page', async () => {
        await avancementComponentsPage.clickOnCreateButton();
        avancementUpdatePage = new AvancementUpdatePage();
        expect(await avancementUpdatePage.getPageTitle()).toMatch(/primempdApp.avancement.home.createOrEditLabel/);
        await avancementUpdatePage.cancel();
    });

    it('should create and save Avancements', async () => {
        await avancementComponentsPage.clickOnCreateButton();
        await avancementUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await avancementUpdatePage.getDateDebutInput()).toContain('2001-01-01T02:30');
        await avancementUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await avancementUpdatePage.getDateFinInput()).toContain('2001-01-01T02:30');
        await avancementUpdatePage.gradeSelectLastOption();
        await avancementUpdatePage.agentSelectLastOption();
        await avancementUpdatePage.save();
        expect(await avancementUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Avancement', async () => {
        const nbButtonsBeforeDelete = await avancementComponentsPage.countDeleteButtons();
        await avancementComponentsPage.clickOnLastDeleteButton();

        avancementDeleteDialog = new AvancementDeleteDialog();
        expect(await avancementDeleteDialog.getDialogTitle()).toMatch(/primempdApp.avancement.delete.question/);
        await avancementDeleteDialog.clickOnConfirmButton();

        expect(await avancementComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
