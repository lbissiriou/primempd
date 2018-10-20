import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrimestreComponentsPage, TrimestreDeleteDialog, TrimestreUpdatePage } from './trimestre.page-object';

describe('Trimestre e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let trimestreUpdatePage: TrimestreUpdatePage;
    let trimestreComponentsPage: TrimestreComponentsPage;
    let trimestreDeleteDialog: TrimestreDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Trimestres', async () => {
        await navBarPage.goToEntity('trimestre');
        trimestreComponentsPage = new TrimestreComponentsPage();
        expect(await trimestreComponentsPage.getTitle()).toMatch(/primempdApp.trimestre.home.title/);
    });

    it('should load create Trimestre page', async () => {
        await trimestreComponentsPage.clickOnCreateButton();
        trimestreUpdatePage = new TrimestreUpdatePage();
        expect(await trimestreUpdatePage.getPageTitle()).toMatch(/primempdApp.trimestre.home.createOrEditLabel/);
        await trimestreUpdatePage.cancel();
    });

    it('should create and save Trimestres', async () => {
        await trimestreComponentsPage.clickOnCreateButton();
        await trimestreUpdatePage.setCodeTrimestreInput('5');
        expect(await trimestreUpdatePage.getCodeTrimestreInput()).toMatch('5');
        await trimestreUpdatePage.setTrimestreInput('trimestre');
        expect(await trimestreUpdatePage.getTrimestreInput()).toMatch('trimestre');
        await trimestreUpdatePage.save();
        expect(await trimestreUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Trimestre', async () => {
        const nbButtonsBeforeDelete = await trimestreComponentsPage.countDeleteButtons();
        await trimestreComponentsPage.clickOnLastDeleteButton();

        trimestreDeleteDialog = new TrimestreDeleteDialog();
        expect(await trimestreDeleteDialog.getDialogTitle()).toMatch(/primempdApp.trimestre.delete.question/);
        await trimestreDeleteDialog.clickOnConfirmButton();

        expect(await trimestreComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
