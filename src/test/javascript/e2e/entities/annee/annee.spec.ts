import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnneeComponentsPage, AnneeDeleteDialog, AnneeUpdatePage } from './annee.page-object';

describe('Annee e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let anneeUpdatePage: AnneeUpdatePage;
    let anneeComponentsPage: AnneeComponentsPage;
    let anneeDeleteDialog: AnneeDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Annees', async () => {
        await navBarPage.goToEntity('annee');
        anneeComponentsPage = new AnneeComponentsPage();
        expect(await anneeComponentsPage.getTitle()).toMatch(/primempdApp.annee.home.title/);
    });

    it('should load create Annee page', async () => {
        await anneeComponentsPage.clickOnCreateButton();
        anneeUpdatePage = new AnneeUpdatePage();
        expect(await anneeUpdatePage.getPageTitle()).toMatch(/primempdApp.annee.home.createOrEditLabel/);
        await anneeUpdatePage.cancel();
    });

    it('should create and save Annees', async () => {
        await anneeComponentsPage.clickOnCreateButton();
        await anneeUpdatePage.setCodeAnneeInput('5');
        expect(await anneeUpdatePage.getCodeAnneeInput()).toMatch('5');
        await anneeUpdatePage.save();
        expect(await anneeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Annee', async () => {
        const nbButtonsBeforeDelete = await anneeComponentsPage.countDeleteButtons();
        await anneeComponentsPage.clickOnLastDeleteButton();

        anneeDeleteDialog = new AnneeDeleteDialog();
        expect(await anneeDeleteDialog.getDialogTitle()).toMatch(/primempdApp.annee.delete.question/);
        await anneeDeleteDialog.clickOnConfirmButton();

        expect(await anneeComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
