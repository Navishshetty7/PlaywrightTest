import { Locator, Page ,expect } from '@playwright/test'

export interface RegisterUserFields {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string; 
  password?: string;        
  repeatedPassword?: string;
}

export class RegisterPage{
    private readonly page : Page;
    private readonly fnamefield: Locator;
    private readonly lnamefield: Locator;
    private readonly streetfield: Locator;
    private readonly cityfield: Locator;
    private readonly statefield: Locator;
    private readonly zipcodefield: Locator;
    private readonly phonenumberfield: Locator;
    private readonly ssnfield: Locator;
    private readonly usernamefield: Locator;
    private readonly passwordfield: Locator;
    private readonly confirmpasswordfield: Locator;
    private readonly registerbtn: Locator;
    private readonly fnameerr: Locator;
    private readonly lnameerr: Locator;
    private readonly streeterr: Locator;
    private readonly cityerr: Locator;
    private readonly stateerr: Locator;
    private readonly zipcodeerr: Locator;
    private readonly ssnerr: Locator;
    private readonly usernameerr: Locator;
    private readonly passworderr: Locator;
    private readonly confpassworderr: Locator;
    private readonly passwordmismatcherr: Locator;
    private readonly usernameexistserr:Locator;



constructor(page:Page) {
     this.page = page;
     this.fnamefield = page.locator('[id="customer.firstName"]');
     this.lnamefield = page.locator('[id="customer.lastName"]');
     this.streetfield = page.locator('[id="customer.address.street"]');
     this.cityfield = page.locator('[id="customer.address.city"]');
     this.statefield = page.locator('[id="customer.address.state"]');
     this.zipcodefield = page.locator('[id="customer.address.zipCode"]');
     this.phonenumberfield = page.locator('[id="customer.phoneNumber"]');
     this.ssnfield = page.locator('[id="customer.ssn"]');
     this.usernamefield = page.locator('[id="customer.username"]');
     this.passwordfield = page.locator('[id="customer.password"]');
     this.confirmpasswordfield = page.locator('#repeatedPassword');
     this.registerbtn = page.getByRole('button', { name: 'Register' });
     this.fnameerr = page.getByText('First name is required.');
     this.lnameerr = page.getByText('Last name is required.');
     this.streeterr = page.getByText('Address is required.');
     this.cityerr = page.getByText('City is required.');
     this.stateerr = page.getByText('State is required.');
     this.zipcodeerr = page.getByText('Zip Code is required.');
     this.ssnerr = page.getByText('Social Security Number is');
     this.usernameerr = page.getByText('Username is required.');
     this.passworderr = page.getByText('Password is required.');
     this.confpassworderr = page.getByText('Password confirmation is');
     this.passwordmismatcherr = page.getByText('Passwords did not match.')
     this.usernameexistserr= page.getByText('This username already exists.')
}
async navigateToRegister() {
  await this.page.goto('/parabank/register.htm'); 
}

async registerNewUser(user: RegisterUserFields) {
    await this.fnamefield.fill(user.firstName);
    await this.lnamefield.fill(user.lastName);
    await this.streetfield.fill(user.address);
    await this.cityfield.fill(user.city);
    await this.statefield.fill(user.state);
    await this.zipcodefield.fill(user.zipCode);
    await this.phonenumberfield.fill(user.phone);
    await this.ssnfield.fill(user.ssn);
    await this.usernamefield.fill(user.username);
    //await this.passwordfield.fill(user.password);
    //await this.confirmpasswordfield.fill(user.password);
    if (user.password) {
      await this.passwordfield.fill(user.password);
    }
    if (user.repeatedPassword) {
      await this.confirmpasswordfield.fill(user.repeatedPassword);
    }    
    await this.registerbtn.click();
  }

  async clickRegisterBtn(){
    await this.registerbtn.click();
  }

  async verifyFirstNameError(expectedText: string) {
    await expect(this.fnameerr).toHaveText(expectedText);
  }

  async verifyLastNameError(expectedText: string) {
    await expect(this.lnameerr).toHaveText(expectedText);
  }

   async verifyStreetNameError(expectedText: string) {
    await expect(this.streeterr).toHaveText(expectedText);
  }

  async verifyCityNameError(expectedText: string) {
    await expect(this.cityerr).toHaveText(expectedText);
  }

  async verifyStateNameError(expectedText: string) {
    await expect(this.stateerr).toHaveText(expectedText);
  }

  async verifyZipCodeError(expectedText: string) {
    await expect(this.zipcodeerr).toHaveText(expectedText);
  }

  async verifySSNError(expectedText: string) {
    await expect(this.ssnerr).toHaveText(expectedText);
  }

  async verifyUserNameError(expectedText: string) {
    await expect(this.usernameerr).toHaveText(expectedText);
  }

  async verifyPasswordError(expectedText: string) {
    await expect(this.passworderr).toHaveText(expectedText);
  }
  
  async verifyConfirmPasswordError(expectedText: string) {
    await expect(this.confpassworderr).toHaveText(expectedText);
  }

  async verifyPasswordMismatchError(expectedText: string) {
    await expect(this.passwordmismatcherr).toHaveText(expectedText);
  }
}