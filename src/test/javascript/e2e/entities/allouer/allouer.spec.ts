import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AllouerComponentsPage, AllouerDeleteDialog, AllouerUpdatePage } from './allouer.page-object';

describe('Allouer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let allouerUpdatePage: AllouerUpdatePage;
    let allouerComponentsPage: AllouerComponentsPage;
    let allouerDeleteDialog: AllouerDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Allouers', async () => {
        await navBarPage.goToEntity('allouer');
        allouerComponentsPage = new AllouerComponentsPage();
        expect(await allouerComponentsPage.getTitle()).toMatch(/primempdApp.allouer.home.title/);
    });

    it('should load create Allouer page', async () => {
        await allouerComponentsPage.clickOnCreateButton();
        allouerUpdatePage = new AllouerUpdatePage();
        expect(await allouerUpdatePage.getPageTitle()).toMatch(/primempdApp.allouer.home.createOrEditLabel/);
        await allouerUpdatePage.cancel();
    });

    it('should create and save Allouers', async () => {
        await allouerComponentsPage.clickOnCreateButton();
        await allouerUpdatePage.setNoteInput('5');
        expect(await allouerUpdatePage.getNoteInput()).toMatch('5');
        await allouerUpdatePage.setNombreJoursInput('5');
        expect(await allouerUpdatePage.getNombreJoursInput()).toMatch('5');
        await allouerUpdatePage.setMontantInput('5');
        expect(await allouerUpdatePage.getMontantInput()).toMatch('5');
        await allouerUpdatePage.agentSelectLastOption();
        await allouerUpdatePage.primeSelectLastOption();
        await allouerUpdatePage.anneeSelectLastOption();
        await allouerUpdatePage.trimestreSelectLastOption();
        await allouerUpdatePage.save();
        expect(await allouerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Allouer', async () => {
        const nbButtonsBeforeDelete = await allouerComponentsPage.countDeleteButtons();
        await allouerComponentsPage.clickOnLastDeleteButton();

        allouerDeleteDialog = new AllouerDeleteDialog();
        expect(await allouerDeleteDialog.getDialogTitle()).toMatch(/primempdApp.allouer.delete.question/);
        await allouerDeleteDialog.clickOnConfirmButton();

        expect(await allouerComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
