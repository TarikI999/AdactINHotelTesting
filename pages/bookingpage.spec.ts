// bookingpage.spec.ts
import { Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

class HotelBookingPage {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string) {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.fillLoginForm(username, password);
    await this.loginPage.clickLoginButton();
  }

  async searchHotel(location: string, hotel: string, roomType: string, roomCount: string, adults: string, children: string) {
    await this.page.selectOption('#location', location);
    await this.page.selectOption('#hotels', hotel);
    await this.page.selectOption('#room_type', roomType);
    await this.page.selectOption('#room_nos', roomCount);
    await this.page.selectOption('#adult_room', adults);
    await this.page.selectOption('#child_room', children);
    await this.page.click('#Submit');
  }

  async selectRoom() {
    await this.page.waitForLoadState('load');

    const selectRadioButton = await this.page.$('input#radiobutton_0');

    if (selectRadioButton) {
      await selectRadioButton.waitForElementState('visible');
      await selectRadioButton.click();

      const continueButton = await this.page.$('input#continue');

      if (continueButton) {
        await continueButton.waitForElementState('visible');
        await continueButton.click();
      } else {
        throw new Error('The "Continue" button is not found on the page.');
      }
    } else {
      throw new Error('The "Select" radio button is not found on the page.');
    }
  }

  async fillBookingDetails(firstName: string, lastName: string, address: string, ccNumber: string, ccType: string, expMonth: string, expYear: string, cvv: string) {
    await this.page.fill('#first_name', firstName);
    await this.page.fill('#last_name', lastName);
    await this.page.fill('#address', address);
    await this.page.fill('#cc_num', ccNumber);
    await this.page.selectOption('#cc_type', ccType);
    await this.page.selectOption('#cc_exp_month', expMonth);
    await this.page.selectOption('#cc_exp_year', expYear);
    await this.page.fill('#cc_cvv', cvv);
  }

  async clickBookNow() {
    await this.page.click('#book_now');
  }

  async waitForBookingConfirmation() {
    await this.page.waitForSelector('td.login_title:has-text("Booking Confirmation")');
  }

  async isBookingConfirmationVisible() {
    return this.page.isVisible('td.login_title:has-text("Booking Confirmation")');
  }

  async getTotalPriceExclGST(): Promise<string> {
    // Use Playwright to fetch the value of "Total Price (excl. GST)" element
    const totalPriceElement = await this.page.$('#total_price_1202418');
    const totalPriceExclGST = await totalPriceElement?.inputValue();
    return totalPriceExclGST || '';
  }
  
  async getPricePerNight(): Promise<string> {
    // Use Playwright to fetch the value of "Price per Night" element
    const pricePerNightElement = await this.page.$('#price_per_night_element_id');
    const pricePerNight = await pricePerNightElement?.inputValue();
    return pricePerNight || '';
  }

  async getTotalPriceOnBookedItinerary(): Promise<string> {
    // Use Playwright to fetch the total price from the "Booked Itinerary" page
    const totalPriceElement = await this.page.$('#total_price_on_booked_itinerary_element_id'); // Replace with the actual selector
    const totalPriceOnBookedItinerary = await totalPriceElement?.innerText();
    return totalPriceOnBookedItinerary || '';
  }
}

export default HotelBookingPage;