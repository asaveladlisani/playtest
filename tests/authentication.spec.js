// @ts-check
import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await expect(page.getByRole('heading', { name: 'Track, test, and deliver' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill('asaveladlisani5@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('P@ssw0rd');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

test.skip('Login with invalid credentials @pass', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('wrong@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('Login with invalid credentials @fail', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('invaliduser@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('User can register', async ({ page }) => {
  await page.goto('http://localhost:8080/login');
  await expect(page.getByRole('heading', { name: 'Track, test, and deliver' })).toBeVisible();

  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Start managing quality today.' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Invalid User');
  await page.getByRole('textbox', { name: 'Email' }).fill('invaliduser@gmail.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('password');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});
