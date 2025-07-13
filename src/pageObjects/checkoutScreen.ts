import { Page } from "@playwright/test";

export class CheckoutScreen {
    constructor(private page: Page) {}

    readonly checkoutButton = '#checkout';
    readonly firstName = '#first-name';
    readonly lastName = '#last-name';
    readonly postalCode = '#postal-code';
    readonly continueButton = '#continue';
    readonly finishButton = '#finish';
    readonly backHomeButton = '#back-to-products';

    async clickCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async fillFirstName(firstName: string) {
        await this.page.fill(this.firstName, firstName);
    }

    async fillLastName(lastName: string) {
        await this.page.fill(this.lastName, lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.page.fill(this.postalCode, postalCode);
    }

    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async clickFinish() {
        await this.page.click(this.finishButton);
    }

    async clickBackHome() {
        await this.page.click(this.backHomeButton);
    }
}