import { Page } from "@playwright/test";

export class LoginScreen {
    constructor(private page: Page) {}
    readonly userName = '#user-name';
    readonly password = '#password';
    readonly loginButton = '#login-button';
    readonly errorMessage = 'Epic sadface: Username and password do not match any user in this service';

    async login(username: string, password: string) {
        await this.page.fill(this.userName, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
}