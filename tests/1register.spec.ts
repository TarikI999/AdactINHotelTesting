// Smoke test 1
// register.spec.ts
import { test, expect, Page } from '@playwright/test';
import RegisterPage from '../Pages/registerpage.spec';

test('User registration test', async ({ page }: { page: Page }) => {
  const registerPage = new RegisterPage();

  // Navigate to the registration page
  await registerPage.navigateToRegisterPage(page);

  // Fill in the registration form, excluding the CAPTCHA value
  await registerPage.fillRegistrationForm(
    page,
    'usernezev1222222',
    'password123',
    'u4424732899q122222222@gmail.com',
    '', // Leave this empty
    'user1234' // Provide the full name here
  );

  // Log a message to instruct the user to manually enter the CAPTCHA value
  console.log('Please manually enter the CAPTCHA value in the browser console.');

  // Pause execution to allow the user to manually input the CAPTCHA in the console
  await new Promise(resolve => setTimeout(resolve, 0));

  // Read the CAPTCHA value from the console (example assumes synchronous input)
  const captchaText = await page.evaluate(() => prompt('Enter CAPTCHA value manually:'));

  // Fill in the CAPTCHA field with the manually entered value
  await page.fill('#captcha-form', captchaText || ''); // Use the entered value or an empty string if nothing is entered

  // Check the terms and conditions checkbox
  await page.check('#tnc_box');

  // Click the register button
await registerPage.clickRegisterButton(page);

// Wait for the verification message
await page.waitForSelector('.reg_success');

// Assertion to check if the registration process displays the expected verification message
const verificationMessage = await page.textContent('.reg_success');
expect(verificationMessage).toContain('An email verification code has been sent to your email address. Please check your email and verify your email address.');

});
