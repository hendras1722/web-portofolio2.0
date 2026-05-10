import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // Import AxeBuilder

test.describe('Home Page', () => {
  test('should navigate to the home page and display the hero section', async ({ page }) => {
    await page.goto('/');

    // Wait for the hero section content to be visible, ensuring data is loaded
    await expect(page.getByRole('heading', { name: 'Software Engineer' })).toBeVisible();

    // Expect a title "to contain" the full dynamic title.
    await expect(page).toHaveTitle(/Home - Muh Syahendra A/);

    // Expect the hero section to be visible (locator for a class)
    await expect(page.locator('.hero-section')).toBeVisible();

    // Further check for specific text content
    await expect(page.getByText('A passionate Software Engineer with expertise in web development.').first()).toBeVisible();
  });

  test('should not have any accessibility violations on the home page', async ({ page }) => {
    await page.goto('/');

    // Wait for the content to be loaded to ensure accessibility checks are performed on a stable page
    await expect(page.getByRole('heading', { name: 'Software Engineer' })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
