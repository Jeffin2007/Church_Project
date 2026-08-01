import { test, expect } from '@playwright/test';

test.describe('Public home page', () => {
  test('loads and shows church name', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Queen of All Saints/i })).toBeVisible();
  });
});

test.describe('Login page', () => {
  test('navigates to login and renders form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Parish Portal/i })).toBeVisible();
  });
});
