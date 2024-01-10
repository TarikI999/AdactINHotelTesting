// Regression test 3
// hotelBookingTest.ts
import { test, expect, Page } from '@playwright/test';
import HotelBookingPage from '../pages/bookingpage.spec';

test('Hotel Booking Test', async ({ page }: { page: Page }) => {
  const hotelBookingPage = new HotelBookingPage(page);

  // Use POM method for login
  await hotelBookingPage.login('nejira000', '1BLZ6P');

  // Use POM methods for hotel booking with different inputs
  await hotelBookingPage.searchHotel('Sydney', 'Hotel Creek', 'Standard', '1', '1', '0');
  await hotelBookingPage.selectRoom();

  // Fill in the booking details with different inputs
  await hotelBookingPage.fillBookingDetails('John', 'Doe', '123 Main St', '4111111111111111', 'VISA', '7', '2012', '123');

  // Click the "Book Now" button
  await hotelBookingPage.clickBookNow();

  // Wait for the Booking Confirmation
  await hotelBookingPage.waitForBookingConfirmation();

  // Check if the Booking Confirmation message is visible
  const isBookingConfirmationVisible = await hotelBookingPage.isBookingConfirmationVisible();
  expect(isBookingConfirmationVisible).toBeTruthy();
});