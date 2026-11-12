import { Page, Locator, expect } from '@playwright/test';

export interface CustomerData {
    customerName: string;
    email: string;
    phoneNumber: string;
}

export class CustomerPage {

    readonly page: Page;
    readonly customerTab: Locator;
    readonly addCustomerButton: Locator;
    readonly phoneNumberInput: Locator;
    readonly customerNameInput: Locator;
    readonly emailInput: Locator;
    readonly assignDocumentsButton: Locator;
    readonly okButton: Locator;
    readonly successfullMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.customerTab = page.getByRole('complementary').getByRole('button', { name: /^Customers\s+\d+$/ });
        this.addCustomerButton = page.locator('#addRow');
        this.phoneNumberInput = page.locator("[placeholder='Enter mobile number']");
        this.customerNameInput = page.locator("[placeholder='Enter contact name']");
        this.emailInput = page.locator("[placeholder='Enter email ID']");
        this.assignDocumentsButton = page.locator('#assign-btn');
        this.okButton = page.locator("[class='swal2-confirm swal2-styled']");
        this.successfullMessage = page.locator("#swal2-html-container");
    }


    async openCustomerSection(): Promise<void> {

        await this.customerTab.click();

        await expect(this.addCustomerButton).toBeVisible();
    }


    async openAddCustomerForm(): Promise<void> {

        await this.addCustomerButton.click();

        await expect(this.customerNameInput).toBeVisible();
        await expect(this.phoneNumberInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
    }


    async fillCustomerDetails(data: CustomerData): Promise<void> {

        await this.customerNameInput.fill(data.customerName);

        await this.phoneNumberInput.fill(data.phoneNumber);

        await this.emailInput.fill(data.email);

    }


    async assignAgreements(): Promise<void> {

        await expect(this.assignDocumentsButton).toBeEnabled();

        await this.assignDocumentsButton.click();

        await expect(this.okButton).toBeVisible();

        await expect(this.successfullMessage).toBeVisible();
        await expect(this.successfullMessage).toHaveText("The customer has been created successfully");

        await this.okButton.click();



        await expect(this.page).toHaveURL(/assign-agreements/);
    }
}