import { Locator, Page } from '@playwright/test'

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
  password: string;
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
    await this.passwordfield.fill(user.password);
    await this.confirmpasswordfield.fill(user.password);    
    await this.registerbtn.click();
  }

// async getErrorMessageText(): Promise<string | null> {
//     return await this.errormessage.textContent();
//   }
}