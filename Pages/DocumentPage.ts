import { Page, Locator, expect } from '@playwright/test';

export class DocumentPage {

    readonly page: Page;
    readonly firstDocument: Locator;
    readonly signatureField: Locator;
    readonly documentCanvas: Locator;
    readonly sendMailButton: Locator;
    readonly sendAnywayButton: Locator;
    readonly sendMailContinueButton: Locator;
    readonly assignmentContinueButton: Locator;
    readonly dialogMessage: Locator;

    constructor(page: Page) {

        this.page = page;


        this.firstDocument = page.getByText('Deepa Suresh', { exact: true });


        this.signatureField = page.getByTitle('Signature', { exact: true });


        this.documentCanvas = page.locator('canvas').first();


        this.sendMailButton = page.locator("[class='btn btn-primary btn-sm']");


        this.sendAnywayButton = page.getByRole('button', {
            name: 'Send anyway',
            exact: true
        });


        this.sendMailContinueButton = page.locator("[class='btn btn-primary ng-star-inserted']");


        this.assignmentContinueButton = page.locator("[class='swal2-confirm swal2-styled swal2-default-outline']");

        this.dialogMessage = page.getByText("Agreement email sent to the customer.");
    }


    async selectFirstDocument(): Promise<void> {

        await expect(this.firstDocument).toBeVisible();

        await this.firstDocument.click();
    }



    async dragSignatureToDocument(): Promise<void> {

        const source = await this.signatureField.boundingBox();

        if (!source) {
            throw new Error('Signature field not found');
        }

        await this.page.mouse.move(
            source.x + source.width / 2,
            source.y + source.height / 2
        );

        await this.page.mouse.down();

        await this.page.mouse.move(950, 600, { steps: 20 });

        await this.page.mouse.up();
    }

    async clickSendMail(): Promise<void> {

        await expect(this.sendMailButton).toBeEnabled();

        await this.sendMailButton.click();
    }


    async clickSendAnyway(): Promise<void> {

        await expect(this.sendAnywayButton).toBeVisible();

        await this.sendAnywayButton.click();
    }


    async continueToSendMail(): Promise<void> {

        await expect(this.sendMailContinueButton).toBeVisible();

        await this.sendMailContinueButton.click();
    }



    async confirmAssignment(): Promise<void> {

        await expect(this.assignmentContinueButton).toBeVisible();

        await this.assignmentContinueButton.click();
        
        await expect(this.dialogMessage).toBeVisible({
            timeout: 15000
        });

        await expect(this.dialogMessage).toContainText(
            'Agreement email sent to the customer.',
            { timeout: 15000 }
        );

    }
}