import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrimeComponentsPage, PrimeDeleteDialog, PrimeUpdatePage } from './prime.page-object';

describe('Prime e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let primeUpdatePage: PrimeUpdatePage;
    let primeComponentsPage: PrimeComponentsPage;
    let primeDeleteDialog: PrimeDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Primes', async () => {
        await navBarPage.goToEntity('prime');
        primeComponentsPage = new PrimeComponentsPage();
        expect(await primeComponentsPage.getTitle()).toMatch(/primempdApp.prime.home.title/);
    });

    it('should load create Prime page', async () => {
        await primeComponentsPage.clickOnCreateButton();
        primeUpdatePage = new PrimeUpdatePage();
        expect(await primeUpdatePage.getPageTitle()).toMatch(/primempdApp.prime.home.createOrEditLabel/);
        await primeUpdatePage.cancel();
    });

    it('should create and save Primes', async () => {
        await primeComponentsPage.clickOnCreateButton();
        await primeUpdatePage.setLibellePrimeInput('libellePrime');
        expect(await primeUpdatePage.getLibellePrimeInput()).toMatch('libellePrime');
        await primeUpdatePage.setTauxMensuelInput('5');
        expect(await primeUpdatePage.getTauxMensuelInput()).toMatch('5');
        await primeUpdatePage.typePrimeSelectLastOption();
        await primeUpdatePage.save();
        expect(await primeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Prime', async () => {
        const nbButtonsBeforeDelete = await primeComponentsPage.countDeleteButtons();
        await primeComponentsPage.clickOnLastDeleteButton();

        primeDeleteDialog = new PrimeDeleteDialog();
        expect(await primeDeleteDialog.getDialogTitle()).toMatch(/primempdApp.prime.delete.question/);
        await primeDeleteDialog.clickOnConfirmButton();

        expect(await primeComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
