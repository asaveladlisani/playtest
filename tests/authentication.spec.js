// @ts-check
import { test, expect } from '@playwright/test';

test('Valid credentials', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await expect(page.getByRole('heading', { name: 'Track, test, and deliver' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill('asaveladlisani5@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw0rd');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

test('Invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('wrong@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
