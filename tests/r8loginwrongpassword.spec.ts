// loginTest.ts
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

test('User login test', async ({ page }: { page: Page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.navigateToLoginPage();

  // Fill in the login form with the wrong password
  await loginPage.fillLoginForm('nejira000', 'wrongPassword');

  // Click the login button
  await loginPage.clickLoginButton();

  // Check the login status
  const loginStatus = await loginPage.checkLoginStatus();

  if (!loginStatus) {
    // Handle unsuccessful login scenario
    console.log('Login unsuccessful');
  }

  // Continue with other test steps as needed
});
