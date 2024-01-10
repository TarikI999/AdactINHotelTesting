// Smoke test 3
// loginTest.ts
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';
import LogoutPage from '../pages/logoutpage.spec';

test('User login and logout test', async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(); // Create an instance of LogoutPage

    // Navigate to the login page
    await loginPage.navigateToLoginPage();
  
    // Fill in the login form
    await loginPage.fillLoginForm('nejira000', '1BLZ6P');
  
    // Click the login button
    await loginPage.clickLoginButton();
  
    // Wait for the welcome message on the redirected page
    await page.waitForSelector('td.welcome_menu:has-text("Welcome to Adactin Group of Hotels")');
  
    // Assertion to check if the welcome message is present
    const welcomeMessage = await page.textContent('td.welcome_menu');
    expect(welcomeMessage).toContain('Welcome to Adactin Group of Hotels');

    // Perform logout using the instance of LogoutPage
    await logoutPage.clickLogoutButton(page);

    // Wait for the logout success message
    await page.waitForSelector('td.reg_success:has-text("You have successfully logged out.")');

    // Assertion to check if the logout success message is present
    const logoutSuccessMessage = await page.textContent('td.reg_success');
    expect(logoutSuccessMessage).toContain('You have successfully logged out.');
});

