// searchTest.ts
import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/loginpage.spec';

test('User search test', async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
  
    // Navigate to the login page
    await loginPage.navigateToLoginPage();
  
    // Fill in the login form
    await loginPage.fillLoginForm('nejira000', '1BLZ6P');
  
    // Click the login button
    await loginPage.clickLoginButton();
  
    // Select Sydney for location
    await page.selectOption('#location', 'Sydney');
  
    // Click on the "Search" button
    await page.click('#Submit');
  
    // Wait for the table containing room information to appear
    await page.waitForSelector('tbody tr td[bgcolor="#FFFFFF"]');
  
    // Get all the room type values
    const roomTypes = await page.$$eval('tbody tr td[bgcolor="#FFFFFF"] input[name^="room_type"]', (elements) =>
      elements.map((element) => (element as HTMLInputElement).value)
    );
  
    // Check if all room types are 'Standard'
    expect(roomTypes.every((type) => type === 'Standard')).toBeTruthy();
  });
  

  

