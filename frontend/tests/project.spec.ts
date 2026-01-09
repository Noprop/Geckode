import { expect, test } from '@playwright/test';
const BASE_URL = 'http://localhost:3000/';

test.describe('Project Name', () => {
  test('can edit project name', async ({ page }) => {
    await page.goto(BASE_URL);

    const projectNameInput = page.getByPlaceholder('Project Name');
    await expect(projectNameInput).toBeVisible();

    // Clear and type new name
    await projectNameInput.fill('My Test Game');

    // Verify the value was set
    await expect(projectNameInput).toHaveValue('My Test Game');
  });
});
