import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CorpsComponentsPage, CorpsDeleteDialog, CorpsUpdatePage } from './corps.page-object';

describe('Corps e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let corpsUpdatePage: CorpsUpdatePage;
    let corpsComponentsPage: CorpsComponentsPage;
    let corpsDeleteDialog: CorpsDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Corps', async () => {
        await navBarPage.goToEntity('corps');
        corpsComponentsPage = new CorpsComponentsPage();
        expect(await corpsComponentsPage.getTitle()).toMatch(/primempdApp.corps.home.title/);
    });

    it('should load create Corps page', async () => {
        await corpsComponentsPage.clickOnCreateButton();
        corpsUpdatePage = new CorpsUpdatePage();
        expect(await corpsUpdatePage.getPageTitle()).toMatch(/primempdApp.corps.home.createOrEditLabel/);
        await corpsUpdatePage.cancel();
    });

    it('should create and save Corps', async () => {
        await corpsComponentsPage.clickOnCreateButton();
        await corpsUpdatePage.setLibelleCorpsInput('libelleCorps');
        expect(await corpsUpdatePage.getLibelleCorpsInput()).toMatch('libelleCorps');
        await corpsUpdatePage.save();
        expect(await corpsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Corps', async () => {
        const nbButtonsBeforeDelete = await corpsComponentsPage.countDeleteButtons();
        await corpsComponentsPage.clickOnLastDeleteButton();

        corpsDeleteDialog = new CorpsDeleteDialog();
        expect(await corpsDeleteDialog.getDialogTitle()).toMatch(/primempdApp.corps.delete.question/);
        await corpsDeleteDialog.clickOnConfirmButton();

        expect(await corpsComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
