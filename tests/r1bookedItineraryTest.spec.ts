// Regession test 1
// bookedItineraryTest.ts
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

test('Booked Itinerary and Search Order ID test', async ({ page }: { page: Page }) => {
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

  // Click on Booked Itinerary
  await page.click('a[href="BookedItinerary.php"]');

  // Enter partial Order ID in the Search Order ID field
  await page.fill('#order_id_text', '48');

  // Click on the "Go" button
  await page.click('#search_hotel_id');

  // Wait for the search result message
  const searchResultMessage = await page.textContent('#search_result_error');
  expect(searchResultMessage).toContain('0 result(s) found.');
});