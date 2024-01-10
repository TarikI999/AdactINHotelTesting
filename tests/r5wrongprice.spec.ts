// Import necessary modules and classes
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';
import HotelBookingPage from '../pages/bookingpage.spec';

test('Verify that the total price is wrong', async ({ page }) => {
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

  // Check if the "Room Type" is not displayed on the Booked Itinerary page
  const isRoomTypeDisplayed = await page.isVisible('#room_type_element_id'); // Replace with the actual selector of the Room Type element
  expect(isRoomTypeDisplayed).toBeFalsy();

  // Check the price on the Booked Itinerary page
  const totalPriceOnBookedItinerary = await bookingPage.getTotalPriceOnBookedItinerary(); // Implement this method in HotelBookingPage
  const pricePerNight = await bookingPage.getPricePerNight(); // Implement this method in HotelBookingPage

  // Assert that the total price on the Booked Itinerary page is equal to the price per night
  expect(totalPriceOnBookedItinerary).toEqual(pricePerNight);
});
