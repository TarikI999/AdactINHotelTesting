// Smoke test 2
// loginTest.ts
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

test('User login test', async ({ page }: { page: Page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.navigateToLoginPage();

  // Fill in the login form
  await loginPage.fillLoginForm('nejira000','1BLZ6P');

  // Click the login button
  await loginPage.clickLoginButton();

  // Wait for the welcome message on the redirected page
  await page.waitForSelector('td.welcome_menu:has-text("Welcome to Adactin Group of Hotels")');

  // Assertion to check if the welcome message is present
  const welcomeMessage = await page.textContent('td.welcome_menu');
  expect(welcomeMessage).toContain('Welcome to Adactin Group of Hotels');
});