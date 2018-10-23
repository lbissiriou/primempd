import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GradeComponentsPage, GradeDeleteDialog, GradeUpdatePage } from './grade.page-object';

describe('Grade e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gradeUpdatePage: GradeUpdatePage;
    let gradeComponentsPage: GradeComponentsPage;
    let gradeDeleteDialog: GradeDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Grades', async () => {
        await navBarPage.goToEntity('grade');
        gradeComponentsPage = new GradeComponentsPage();
        expect(await gradeComponentsPage.getTitle()).toMatch(/primempdApp.grade.home.title/);
    });

    it('should load create Grade page', async () => {
        await gradeComponentsPage.clickOnCreateButton();
        gradeUpdatePage = new GradeUpdatePage();
        expect(await gradeUpdatePage.getPageTitle()).toMatch(/primempdApp.grade.home.createOrEditLabel/);
        await gradeUpdatePage.cancel();
    });

    it('should create and save Grades', async () => {
        await gradeComponentsPage.clickOnCreateButton();
        await gradeUpdatePage.setGradeInput('grade');
        expect(await gradeUpdatePage.getGradeInput()).toMatch('grade');
        await gradeUpdatePage.setIndiceBaseInput('5');
        expect(await gradeUpdatePage.getIndiceBaseInput()).toMatch('5');
        await gradeUpdatePage.save();
        expect(await gradeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Grade', async () => {
        const nbButtonsBeforeDelete = await gradeComponentsPage.countDeleteButtons();
        await gradeComponentsPage.clickOnLastDeleteButton();

        gradeDeleteDialog = new GradeDeleteDialog();
        expect(await gradeDeleteDialog.getDialogTitle()).toMatch(/primempdApp.grade.delete.question/);
        await gradeDeleteDialog.clickOnConfirmButton();

        expect(await gradeComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
