import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
    this.submitButton = page.getByRole('button', { name: 'Create account' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.mismatchError = page.getByText('Passwords do not match');
  }

  async goto() {
    await this.page.goto('http://localhost:8080/register');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  }

  async fillForm(fullName, email, password, confirmPassword = password) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submit() {
    await this.submitButton.click();
  }
}
