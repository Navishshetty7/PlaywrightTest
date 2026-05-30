import { RegisterPage } from "../page_objects/registerPage";
import {test, expect} from "@playwright/test";
import * as registerData from '../test-data/user-register-data.json';

test.describe('ParaBank User Registration Tests', () => {

  test('Should successfully register a new account with valid details', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const shortUniqueId = String(Date.now()).slice(-5);
    
    await registerPage.navigateToRegister();

    // Prepare data: Combine static JSON data with a unique dynamic username
    const uniqueUserObj = {
      ...registerData.validUser,
      username: `u_${shortUniqueId}` 
    };

    await registerPage.registerNewUser(uniqueUserObj);

    const successHeader = page.getByRole('heading', { 
      name: `Welcome ${uniqueUserObj.username}`, 
      level: 1 
    });
    await expect(successHeader).toBeVisible();
    
    const successMessage = page.getByText('Your account was created successfully. You are now logged in.');
    await expect(successMessage).toBeVisible();
  });
});

