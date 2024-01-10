// LoginPage.ts
import { Page, expect } from '@playwright/test';

class LoginPage {
  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto('https://adactinhotelapp.com/index.php');
  }

  async fillLoginForm(username: string | object, password: string | object) {
    const usernameString = typeof username === 'string' ? username : String(username);
    const passwordString = typeof password === 'string' ? password : String(password);
  
    await this.page.fill('#username', usernameString);
    await this.page.fill('#password', passwordString);
  }

  async clickLoginButton() {
    await this.page.click('#login');
  }

  async checkLoginStatus() {
    // Check if there is an error message
    const errorMessage = await this.page.textContent('.auth_error');
    
    if (errorMessage) {
      // Assertion for unsuccessful login
      expect(errorMessage).toContain('Invalid Login details');
      return false;
    } else {
      // Assertion for successful login
      const successfulLogin = await this.page.waitForSelector('td.welcome_menu:has-text("Welcome to Adactin Group of Hotels")', { timeout: 5000 }).then(() => true).catch(() => false);
      expect(successfulLogin).toBe(true);
      return true;
    }
  }
}

export default LoginPage;
