
import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly phoneNumberInput: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly sendOtpButton: Locator;
    readonly otpInput: Locator;
    readonly verifyOtpButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.phoneNumberInput = page.locator('#phone');
        this.termsAndConditionsCheckbox = page.locator("[type='checkbox']");
        this.sendOtpButton = page.getByRole('button', { name: 'Sign in' });


        this.otpInput = page.locator('.otp-inputs input');

        this.verifyOtpButton = page.getByRole('button', { name: 'Verify' });
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('/');
    }

    async enterPhoneNumber(phoneNumber: string): Promise<void> {
        await this.phoneNumberInput.fill(phoneNumber);
        await this.termsAndConditionsCheckbox.check();
    }

    async clickSendOtp(): Promise<void> {
        await this.sendOtpButton.click();
    }

    async enterOtp(otp: string): Promise<void> {
        const otpFields = this.otpInput;

        for (let i = 0; i < otp.length; i++) {
            await otpFields.nth(i).fill(otp[i]);
        }
    }

    async clickVerifyOtp(): Promise<void> {
        await this.verifyOtpButton.click();
    }
}
