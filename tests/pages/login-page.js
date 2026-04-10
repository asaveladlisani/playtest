import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto('http://localhost:8080/login');
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async signIn(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.signInButton.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Track, test, and deliver' })).toBeVisible();
  }

  async expectEmailPlaceholder(placeholder) {
    await expect(this.emailInput).toHaveAttribute('placeholder', placeholder);
  }

  async expectPasswordPlaceholder(placeholder) {
    await expect(this.passwordInput).toHaveAttribute('placeholder', placeholder);
  }
}
