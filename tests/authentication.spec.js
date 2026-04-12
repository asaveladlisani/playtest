// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLoaded();

  await loginPage.signIn('asaveladlisani5@gmail.com', 'P@ssw0rd');
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

test('Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('wrong@gmail.com', 'password');
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test.skip('Login page shows expected placeholders', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLoaded();

  await loginPage.expectEmailPlaceholder('name@example.com');
  await loginPage.expectPasswordPlaceholder('Password');
});

test('Sign up link opens registration page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.clickSignUp();

  await expect(page.getByRole('heading', { name: 'Start managing quality today.' })).toBeVisible();
});

test('User can register', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const uniqueEmail = `qa-user-${Date.now()}@example.com`;
  await registerPage.goto();
  await registerPage.expectLoaded();
  await registerPage.fillForm('Playwright User', uniqueEmail, 'password');
  await registerPage.submit();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

test('Registration page shows the full form', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.expectLoaded();

  await expect(registerPage.fullNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.confirmPasswordInput).toBeVisible();
  await expect(registerPage.submitButton).toBeVisible();
});

test('Registration form accepts user input', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillForm('John Doe', 'john@example.com', 'password123');

  await expect(registerPage.fullNameInput).toHaveValue('John Doe');
  await expect(registerPage.emailInput).toHaveValue('john@example.com');
  await expect(registerPage.passwordInput).toHaveValue('password123');
  await expect(registerPage.confirmPasswordInput).toHaveValue('password123');
});

test('Registration page can navigate back to sign in', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await expect(registerPage.signInLink).toBeVisible();

  await registerPage.signInLink.click();
  await expect(page).toHaveURL(/\/login$/);
});

test('Registration form marks all fields as required', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  await expect(registerPage.fullNameInput).toHaveJSProperty('required', true);
  await expect(registerPage.emailInput).toHaveJSProperty('required', true);
  await expect(registerPage.passwordInput).toHaveJSProperty('required', true);
  await expect(registerPage.confirmPasswordInput).toHaveJSProperty('required', true);
});

test('Registration shows a password mismatch error', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillForm('John Doe', 'john@example.com', 'password123', 'differentPassword');
  await registerPage.submit();

  await expect(registerPage.mismatchError).toBeVisible();
});
