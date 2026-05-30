import { RegisterPage } from "../page_objects/RegisterPage";
import {test, expect} from "@playwright/test";
import registerData from '../test-data/user-register-data.json';

test.describe('ParaBank User Registration Tests', () => {

  test('Verify successfull register of a new account with valid details', async ({ page }) => {
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

  test('Verify errors if nothing is entered', async ({ page }) =>{
    const registerPage = new RegisterPage(page);
    await registerPage.navigateToRegister();
    await registerPage.clickRegisterBtn();
    await registerPage.verifyFirstNameError('First name is required.');
    await registerPage.verifyLastNameError('Last name is required.');
    await registerPage.verifyStreetNameError('Address is required.');
    await registerPage.verifyCityNameError('City is required.');
    await registerPage.verifyStateNameError('State is required.');
    await registerPage.verifyZipCodeError('Zip Code is required.');
    await registerPage.verifySSNError('Social Security Number is required.');
    await registerPage.verifyUserNameError('Username is required.');
    await registerPage.verifyPasswordError('Password is required.');
    await registerPage.verifyConfirmPasswordError('Password confirmation is required.');    
  });

  test('Verify confirm password mismatch ', async ({ page }) =>{
    const registerPage = new RegisterPage(page);
    const shortUniqueId = String(Date.now()).slice(-5);
    await registerPage.navigateToRegister();
     const uniqueUserPassObj = {
      ...registerData.validUser,
      username: `u_${shortUniqueId}` ,
      password: 'Password123',
      repeatedPassword: 'WrongPassword456'
    };
    await registerPage.registerNewUser(uniqueUserPassObj);
    await registerPage.verifyPasswordMismatchError('Passwords did not match.');
  })

});

