// registerPage.ts
import { Page } from '@playwright/test';

class RegisterPage {
  async navigateToRegisterPage(page: Page) {
    // Navigate to the main page
    await page.goto('https://adactinhotelapp.com/');

    // Click on "New User Register Here" link
    await page.click('a[href="Register.php"]');
  }

  async fillRegistrationForm(
    page: Page,
    username: string,
    password: string,
    email: string,
    captchaText: string,
    fullName: string
  ) {
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.fill('#re_password', password);
    await page.fill('#full_name', fullName); // Add the full name field
    await page.fill('#email_add', email);

    // Check the terms and conditions checkbox
    await page.check('#tnc_box');
  }

  async clickRegisterButton(page: Page) {
    await page.click('#Submit');
  }
}

export default RegisterPage;
