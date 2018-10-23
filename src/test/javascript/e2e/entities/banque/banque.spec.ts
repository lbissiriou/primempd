import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BanqueComponentsPage, BanqueDeleteDialog, BanqueUpdatePage } from './banque.page-object';

describe('Banque e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let banqueUpdatePage: BanqueUpdatePage;
    let banqueComponentsPage: BanqueComponentsPage;
    let banqueDeleteDialog: BanqueDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Banques', async () => {
        await navBarPage.goToEntity('banque');
        banqueComponentsPage = new BanqueComponentsPage();
        expect(await banqueComponentsPage.getTitle()).toMatch(/primempdApp.banque.home.title/);
    });

    it('should load create Banque page', async () => {
        await banqueComponentsPage.clickOnCreateButton();
        banqueUpdatePage = new BanqueUpdatePage();
        expect(await banqueUpdatePage.getPageTitle()).toMatch(/primempdApp.banque.home.createOrEditLabel/);
        await banqueUpdatePage.cancel();
    });

    it('should create and save Banques', async () => {
        await banqueComponentsPage.clickOnCreateButton();
        await banqueUpdatePage.setCodeBanqueInput('codeBanque');
        expect(await banqueUpdatePage.getCodeBanqueInput()).toMatch('codeBanque');
        await banqueUpdatePage.setNomBanqueInput('nomBanque');
        expect(await banqueUpdatePage.getNomBanqueInput()).toMatch('nomBanque');
        await banqueUpdatePage.setSiegeSocialInput('siegeSocial');
        expect(await banqueUpdatePage.getSiegeSocialInput()).toMatch('siegeSocial');
        await banqueUpdatePage.setTelephoneInput('telephone');
        expect(await banqueUpdatePage.getTelephoneInput()).toMatch('telephone');
        await banqueUpdatePage.setFaxInput('fax');
        expect(await banqueUpdatePage.getFaxInput()).toMatch('fax');
        await banqueUpdatePage.setEmailInput('email');
        expect(await banqueUpdatePage.getEmailInput()).toMatch('email');
        await banqueUpdatePage.save();
        expect(await banqueUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Banque', async () => {
        const nbButtonsBeforeDelete = await banqueComponentsPage.countDeleteButtons();
        await banqueComponentsPage.clickOnLastDeleteButton();

        banqueDeleteDialog = new BanqueDeleteDialog();
        expect(await banqueDeleteDialog.getDialogTitle()).toMatch(/primempdApp.banque.delete.question/);
        await banqueDeleteDialog.clickOnConfirmButton();

        expect(await banqueComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
