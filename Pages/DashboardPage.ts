import { Page, Locator, expect } from '@playwright/test';

export class dashboardpage {

    readonly page: Page;
    readonly menuButton: Locator;
    readonly signOutButton: Locator;




    constructor(page: Page) {

        this.page = page;
        this.menuButton = page.locator("[class='rail-user-btn']");
        this.signOutButton = page.locator("[class='rail-user-out']");
    }


    async signOut() {

        await this.menuButton.click();
        await this.signOutButton.click();
        await expect(this.page).toHaveURL("https://cpastaging.aisignpro.com/");
    }


}