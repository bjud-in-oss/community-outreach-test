import { test, expect } from '@playwright/test';

test('should display the local development dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Local Development Dashboard');
});

test('should navigate to the live testing page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Implement Feature X');
  await expect(page.locator('h1')).toHaveText('Live Testing for Task 1');
});

test('should display the visual approval dashboard', async ({ page }) => {
  await page.goto('/approval');
  await expect(page.locator('h1')).toHaveText('Visual Approval Dashboard');
});

test('should approve a task', async ({ page }) => {
  await page.goto('/approval');
  await page.click('text=Approve');
  await expect(page.locator('text=Status: Approved')).toBeVisible();
});
