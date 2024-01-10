// Regresion test 2
//lastname.spec.ts
import { expect, test, Page } from '@playwright/test';
import HotelBookingPage from '../pages/bookingpage.spec';  // Update the path accordingly

test('Verify Last Name field is blank in booking confirmation page', async ({ page }) => {
  const hotelBookingPage = new HotelBookingPage(page);

  // Perform login
  await hotelBookingPage.login('nejira000', '1BLZ6P');  // Replace with valid credentials

  // Perform hotel search
  await hotelBookingPage.searchHotel('Sydney', 'Hotel Creek', 'Standard', '1', '1', '0');

  // Select room and continue
  await hotelBookingPage.selectRoom();

  // Fill booking details
  await hotelBookingPage.fillBookingDetails('John', 'Doe', '123 Main St', '1234567890123456', 'VISA', '12', '2023', '123');

  // Click on "Book Now"
  await hotelBookingPage.clickBookNow();

  // Wait for booking confirmation
  await hotelBookingPage.waitForBookingConfirmation();

  // Check if the "Last Name" field is blank
  const isLastNameBlank = await page.$eval('input#last_name', (el) => (el as HTMLInputElement).value.trim() === '');

  // Assertion
  expect(isLastNameBlank).toBeTruthy();
});
