import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompteComponentsPage, CompteDeleteDialog, CompteUpdatePage } from './compte.page-object';

describe('Compte e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let compteUpdatePage: CompteUpdatePage;
    let compteComponentsPage: CompteComponentsPage;
    let compteDeleteDialog: CompteDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Comptes', async () => {
        await navBarPage.goToEntity('compte');
        compteComponentsPage = new CompteComponentsPage();
        expect(await compteComponentsPage.getTitle()).toMatch(/primempdApp.compte.home.title/);
    });

    it('should load create Compte page', async () => {
        await compteComponentsPage.clickOnCreateButton();
        compteUpdatePage = new CompteUpdatePage();
        expect(await compteUpdatePage.getPageTitle()).toMatch(/primempdApp.compte.home.createOrEditLabel/);
        await compteUpdatePage.cancel();
    });

    it('should create and save Comptes', async () => {
        await compteComponentsPage.clickOnCreateButton();
        await compteUpdatePage.setNumeroCompteInput('numeroCompte');
        expect(await compteUpdatePage.getNumeroCompteInput()).toMatch('numeroCompte');
        await compteUpdatePage.banqueSelectLastOption();
        await compteUpdatePage.agentSelectLastOption();
        await compteUpdatePage.save();
        expect(await compteUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Compte', async () => {
        const nbButtonsBeforeDelete = await compteComponentsPage.countDeleteButtons();
        await compteComponentsPage.clickOnLastDeleteButton();

        compteDeleteDialog = new CompteDeleteDialog();
        expect(await compteDeleteDialog.getDialogTitle()).toMatch(/primempdApp.compte.delete.question/);
        await compteDeleteDialog.clickOnConfirmButton();

        expect(await compteComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
