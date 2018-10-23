import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChangementComponentsPage, ChangementDeleteDialog, ChangementUpdatePage } from './changement.page-object';

describe('Changement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let changementUpdatePage: ChangementUpdatePage;
    let changementComponentsPage: ChangementComponentsPage;
    let changementDeleteDialog: ChangementDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Changements', async () => {
        await navBarPage.goToEntity('changement');
        changementComponentsPage = new ChangementComponentsPage();
        expect(await changementComponentsPage.getTitle()).toMatch(/primempdApp.changement.home.title/);
    });

    it('should load create Changement page', async () => {
        await changementComponentsPage.clickOnCreateButton();
        changementUpdatePage = new ChangementUpdatePage();
        expect(await changementUpdatePage.getPageTitle()).toMatch(/primempdApp.changement.home.createOrEditLabel/);
        await changementUpdatePage.cancel();
    });

    it('should create and save Changements', async () => {
        await changementComponentsPage.clickOnCreateButton();
        await changementUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await changementUpdatePage.getDateDebutInput()).toContain('2001-01-01T02:30');
        await changementUpdatePage.setDatefinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await changementUpdatePage.getDatefinInput()).toContain('2001-01-01T02:30');
        await changementUpdatePage.agentSelectLastOption();
        await changementUpdatePage.corpsSelectLastOption();
        await changementUpdatePage.save();
        expect(await changementUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Changement', async () => {
        const nbButtonsBeforeDelete = await changementComponentsPage.countDeleteButtons();
        await changementComponentsPage.clickOnLastDeleteButton();

        changementDeleteDialog = new ChangementDeleteDialog();
        expect(await changementDeleteDialog.getDialogTitle()).toMatch(/primempdApp.changement.delete.question/);
        await changementDeleteDialog.clickOnConfirmButton();

        expect(await changementComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
