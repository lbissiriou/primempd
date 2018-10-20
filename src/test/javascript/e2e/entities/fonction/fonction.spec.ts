import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FonctionComponentsPage, FonctionDeleteDialog, FonctionUpdatePage } from './fonction.page-object';

describe('Fonction e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fonctionUpdatePage: FonctionUpdatePage;
    let fonctionComponentsPage: FonctionComponentsPage;
    let fonctionDeleteDialog: FonctionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Fonctions', async () => {
        await navBarPage.goToEntity('fonction');
        fonctionComponentsPage = new FonctionComponentsPage();
        expect(await fonctionComponentsPage.getTitle()).toMatch(/primempdApp.fonction.home.title/);
    });

    it('should load create Fonction page', async () => {
        await fonctionComponentsPage.clickOnCreateButton();
        fonctionUpdatePage = new FonctionUpdatePage();
        expect(await fonctionUpdatePage.getPageTitle()).toMatch(/primempdApp.fonction.home.createOrEditLabel/);
        await fonctionUpdatePage.cancel();
    });

    it('should create and save Fonctions', async () => {
        await fonctionComponentsPage.clickOnCreateButton();
        await fonctionUpdatePage.setTitreInput('titre');
        expect(await fonctionUpdatePage.getTitreInput()).toMatch('titre');
        await fonctionUpdatePage.save();
        expect(await fonctionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Fonction', async () => {
        const nbButtonsBeforeDelete = await fonctionComponentsPage.countDeleteButtons();
        await fonctionComponentsPage.clickOnLastDeleteButton();

        fonctionDeleteDialog = new FonctionDeleteDialog();
        expect(await fonctionDeleteDialog.getDialogTitle()).toMatch(/primempdApp.fonction.delete.question/);
        await fonctionDeleteDialog.clickOnConfirmButton();

        expect(await fonctionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
