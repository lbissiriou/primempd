import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AffectationComponentsPage, AffectationDeleteDialog, AffectationUpdatePage } from './affectation.page-object';

describe('Affectation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let affectationUpdatePage: AffectationUpdatePage;
    let affectationComponentsPage: AffectationComponentsPage;
    let affectationDeleteDialog: AffectationDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Affectations', async () => {
        await navBarPage.goToEntity('affectation');
        affectationComponentsPage = new AffectationComponentsPage();
        expect(await affectationComponentsPage.getTitle()).toMatch(/primempdApp.affectation.home.title/);
    });

    it('should load create Affectation page', async () => {
        await affectationComponentsPage.clickOnCreateButton();
        affectationUpdatePage = new AffectationUpdatePage();
        expect(await affectationUpdatePage.getPageTitle()).toMatch(/primempdApp.affectation.home.createOrEditLabel/);
        await affectationUpdatePage.cancel();
    });

    it('should create and save Affectations', async () => {
        await affectationComponentsPage.clickOnCreateButton();
        await affectationUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await affectationUpdatePage.getDateDebutInput()).toContain('2001-01-01T02:30');
        await affectationUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await affectationUpdatePage.getDateFinInput()).toContain('2001-01-01T02:30');
        await affectationUpdatePage.agentSelectLastOption();
        await affectationUpdatePage.directionSelectLastOption();
        await affectationUpdatePage.save();
        expect(await affectationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Affectation', async () => {
        const nbButtonsBeforeDelete = await affectationComponentsPage.countDeleteButtons();
        await affectationComponentsPage.clickOnLastDeleteButton();

        affectationDeleteDialog = new AffectationDeleteDialog();
        expect(await affectationDeleteDialog.getDialogTitle()).toMatch(/primempdApp.affectation.delete.question/);
        await affectationDeleteDialog.clickOnConfirmButton();

        expect(await affectationComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
