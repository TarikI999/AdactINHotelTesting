// Booking allowed with dates in the past
// Regresion test 4
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

test('User login test', async ({ page }: { page: Page }) => {
  const loginPage = new LoginPage(page);

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

  // Select Sydney for location
  await page.selectOption('#location', 'Sydney');

  // Set check in date
  await page.fill('#datepick_in', '06/01/2023');

  // Set check out date
  await page.fill('#datepick_out', '07/01/2023');
  
  // Click on search
  await page.click('#Submit');

  // Click select on some hotel
  await page.click('#radiobutton_1');

  // Click continue
  await page.click('#continue');

  // Fill in First Name
  await page.fill('#first_name', 'Affan');

  // Fill in Last Name
  await page.fill('#last_name', 'Kapidzic');

  // Fill in Billing Address
  await page.fill('#address', 'Affan Kapidzic 36');

  // Fill in Credit Card No.
  await page.fill('#cc_num', '1111222233334444');

  // Select Credit Card Type
  await page.selectOption('#cc_type', 'VISA');

  // Select Month
  await page.selectOption('#cc_exp_month', 'January');

  // Select Year
  await page.selectOption('#cc_exp_year', '2024');

  // Fill in CVV Number
  await page.fill('#cc_cvv', '111');

  // Click Book Now
  await page.click('#book_now');

  

});