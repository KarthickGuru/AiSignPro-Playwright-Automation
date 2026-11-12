
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.ts';
import { CustomerPage } from '../Pages/CustomerPage.ts';
import { DocumentPage } from '../Pages/DocumentPage.ts';
import testdata from '../testdata/CustomerDetails.json';
import { dashboardpage } from '../Pages/DashboardPage.ts';

test.describe('AiSign Pro - Customer Creation and Agreement Assignment', () => {

    for (const customer of testdata) {

        test(`Verify Customer Creation and Agreement Assignment - ${customer.customerName} | ${customer.email} | ${customer.phoneNumber}`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            const customerPage = new CustomerPage(page);
            const documentPage = new DocumentPage(page);
            const dashboardPage = new dashboardpage(page);

            await loginPage.navigateToLoginPage();
            await loginPage.enterPhoneNumber('666 444 6664');
            await loginPage.clickSendOtp();

            //await page.waitForTimeout(30000);
            await page.pause();

            await loginPage.enterOtp('123456');
            await loginPage.clickVerifyOtp();

            await customerPage.openCustomerSection();
            await customerPage.openAddCustomerForm();
            await customerPage.fillCustomerDetails(customer);
            await customerPage.assignAgreements();

            await documentPage.selectFirstDocument();
            await documentPage.dragSignatureToDocument();
            await documentPage.clickSendMail();
            await documentPage.clickSendAnyway();
            await documentPage.continueToSendMail();
            await documentPage.confirmAssignment();


            await dashboardPage.signOut();




        });
    }
});
