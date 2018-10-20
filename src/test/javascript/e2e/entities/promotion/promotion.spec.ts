import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PromotionComponentsPage, PromotionDeleteDialog, PromotionUpdatePage } from './promotion.page-object';

describe('Promotion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let promotionUpdatePage: PromotionUpdatePage;
    let promotionComponentsPage: PromotionComponentsPage;
    let promotionDeleteDialog: PromotionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Promotions', async () => {
        await navBarPage.goToEntity('promotion');
        promotionComponentsPage = new PromotionComponentsPage();
        expect(await promotionComponentsPage.getTitle()).toMatch(/primempdApp.promotion.home.title/);
    });

    it('should load create Promotion page', async () => {
        await promotionComponentsPage.clickOnCreateButton();
        promotionUpdatePage = new PromotionUpdatePage();
        expect(await promotionUpdatePage.getPageTitle()).toMatch(/primempdApp.promotion.home.createOrEditLabel/);
        await promotionUpdatePage.cancel();
    });

    it('should create and save Promotions', async () => {
        await promotionComponentsPage.clickOnCreateButton();
        await promotionUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await promotionUpdatePage.getDateDebutInput()).toContain('2001-01-01T02:30');
        await promotionUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await promotionUpdatePage.getDateFinInput()).toContain('2001-01-01T02:30');
        await promotionUpdatePage.agentSelectLastOption();
        await promotionUpdatePage.fonctionSelectLastOption();
        await promotionUpdatePage.save();
        expect(await promotionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Promotion', async () => {
        const nbButtonsBeforeDelete = await promotionComponentsPage.countDeleteButtons();
        await promotionComponentsPage.clickOnLastDeleteButton();

        promotionDeleteDialog = new PromotionDeleteDialog();
        expect(await promotionDeleteDialog.getDialogTitle()).toMatch(/primempdApp.promotion.delete.question/);
        await promotionDeleteDialog.clickOnConfirmButton();

        expect(await promotionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
