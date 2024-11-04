import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Wait for the navbar to be loaded
    await page.waitForSelector('.navbar', { state: 'visible' });

    // Click login button
    const loginButton = page.getByRole('button', { name: /sign in/i });
    await loginButton.waitFor({ state: 'visible' });
    await loginButton.click();

    // Verify login form is displayed using ARIA attributes
    const modal = page.locator('dialog[role="dialog"][open]');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Verify the modal title using aria-labelledby
    const modalTitle = modal.locator('#modal-title', { hasText: 'Sign In' });
    await expect(modalTitle).toBeVisible();
  });
});
