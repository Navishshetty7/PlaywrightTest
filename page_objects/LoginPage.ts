import { Locator, Page, expect } from '@playwright/test'

export class LoginPage{
    private readonly page : Page;
    private readonly usernamefield: Locator;
    private readonly passwordfield: Locator;
    private readonly loginbtn: Locator;
    private readonly errormessage: Locator;

constructor(page:Page) {
    this.page = page;
    this.usernamefield = page.locator('input[name="username"]');
    this.passwordfield = page.locator('input[name="password"]');
    this.loginbtn = page.getByRole('button', {name:'Log In'});
    this.errormessage = page.locator('p.error'); 
}
async navigateToParaBank() {
  await this.page.goto('/parabank/index.htm'); 
}

async login(username: string, password: string) {
    await this.usernamefield.fill(username);
    await this.passwordfield.fill(password);
    await this.loginbtn.click();
  }

async getErrorMessageText(): Promise<string | null> {
    return await this.errormessage.textContent();
  }
async getErrorMessageExists() {
    await expect(this.errormessage).toBeVisible();
  }

}