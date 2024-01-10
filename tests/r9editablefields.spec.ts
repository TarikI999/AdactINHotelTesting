// Regresion test 9
// editablefields.spec.ts
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';
import HotelBookingPage from '../pages/bookingpage.spec';

test('Verify fields in Booked Itinerary table are editable', async ({ page }) => {
  // Log in to the website
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillLoginForm('nejira000', '1BLZ6P');
  await loginPage.clickLoginButton();

  // Navigate to Booked Itinerary page
  await page.goto('https://adactinhotelapp.com/BookedItinerary.php');

  // Check that the first row fields are not editable
  const firstRowFieldsEditable = await page.$$eval('.table tbody tr:first-child input', (inputs) =>
    inputs.every((input) => (input as HTMLInputElement).readOnly)
  );
  expect(firstRowFieldsEditable).toBe(true);

  // Check that fields in rows below the first row are editable
  const otherRowsFieldsEditable = await page.$$eval('.table tbody tr:not(:first-child) input', (inputs) =>
    inputs.every((input) => !(input as HTMLInputElement).readOnly)
  );
  expect(otherRowsFieldsEditable).toBe(true);
});
