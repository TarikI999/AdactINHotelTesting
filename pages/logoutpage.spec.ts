// logoutPage.ts
import { Page } from '@playwright/test';

class LogoutPage {
  async clickLogoutButton(page: Page) {
    await page.click('a[href="Logout.php"]');
  }
}

export default LogoutPage;
