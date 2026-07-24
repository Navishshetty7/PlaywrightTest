import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/LoginPage';

test.describe('ParaBank Login Tests', () => {
  
  test('Should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToParaBank();
    await loginPage.login('invalidUser', 'wrongPassword');
    await loginPage.getErrorMessageExists();
    
    // Deprecated
    //const errorText = await loginPage.getErrorMessageText();
    //expect(errorText).toContain('The username and password could not be verified.');
  });

  test('Should navigate to account overview page upon successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToParaBank();
    // Note: ParaBank allows 'john' / 'demo' by default, or you can register a custom user
    await loginPage.login('john', 'demo'); 
    
    // Playwright assertion that waits for the URL to change
    await expect(page).toHaveURL(/.*overview.htm/);
    
    // Verify a unique element on the logged-in dashboard is visible
    // Find the specific h1 heading with this exact text
    const dashboardHeader = page.getByRole('heading', { name: 'Accounts Overview', level: 1 });
    await expect(dashboardHeader).toBeVisible();
  });

});