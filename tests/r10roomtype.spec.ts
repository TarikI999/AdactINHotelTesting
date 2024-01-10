// Regresion test 10
// roomtype.spec.ts
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';
import HotelBookingPage from '../pages/bookingpage.spec';

test('Verify Room Type is not displayed on Booked Itinerary page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookingPage = new HotelBookingPage(page);

  // Perform login
  await bookingPage.login('nejira000', '1BLZ6P');

  // Perform hotel booking
  await bookingPage.searchHotel('Sydney', 'Hotel Creek', 'Double', '1', '1', '0');
  await bookingPage.selectRoom();
  await bookingPage.fillBookingDetails('John', 'Doe', '123 Street', '1234567890123456', 'VISA', '12', '2023', '123');
  await bookingPage.clickBookNow();
  await bookingPage.waitForBookingConfirmation();

  // Navigate to Booked Itinerary page
  await page.click('#my_itinerary');

  // Check that the Room Type is not displayed
  const isRoomTypeVisible = await page.isVisible('td.room_details:has-text("Double")');
  expect(isRoomTypeVisible).toBe(false);
});
