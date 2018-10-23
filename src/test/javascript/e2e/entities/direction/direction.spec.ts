import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DirectionComponentsPage, DirectionDeleteDialog, DirectionUpdatePage } from './direction.page-object';

describe('Direction e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let directionUpdatePage: DirectionUpdatePage;
    let directionComponentsPage: DirectionComponentsPage;
    let directionDeleteDialog: DirectionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Directions', async () => {
        await navBarPage.goToEntity('direction');
        directionComponentsPage = new DirectionComponentsPage();
        expect(await directionComponentsPage.getTitle()).toMatch(/primempdApp.direction.home.title/);
    });

    it('should load create Direction page', async () => {
        await directionComponentsPage.clickOnCreateButton();
        directionUpdatePage = new DirectionUpdatePage();
        expect(await directionUpdatePage.getPageTitle()).toMatch(/primempdApp.direction.home.createOrEditLabel/);
        await directionUpdatePage.cancel();
    });

    it('should create and save Directions', async () => {
        await directionComponentsPage.clickOnCreateButton();
        await directionUpdatePage.setSigleInput('sigle');
        expect(await directionUpdatePage.getSigleInput()).toMatch('sigle');
        await directionUpdatePage.setLibelleDirectionInput('libelleDirection');
        expect(await directionUpdatePage.getLibelleDirectionInput()).toMatch('libelleDirection');
        await directionUpdatePage.save();
        expect(await directionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Direction', async () => {
        const nbButtonsBeforeDelete = await directionComponentsPage.countDeleteButtons();
        await directionComponentsPage.clickOnLastDeleteButton();

        directionDeleteDialog = new DirectionDeleteDialog();
        expect(await directionDeleteDialog.getDialogTitle()).toMatch(/primempdApp.direction.delete.question/);
        await directionDeleteDialog.clickOnConfirmButton();

        expect(await directionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
