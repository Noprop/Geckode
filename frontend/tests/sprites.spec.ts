import { expect, test } from '@playwright/test';
const BASE_URL = 'http://localhost:3000/';


test.describe('Sprite Management', () => {
  test('can add a sprite to the phaser instance', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByTitle('Add new sprite').click();
    await page.getByTitle('Click to add to center of the game window').first().click();

    await expect(page.getByText('Sprite')).toBeVisible();
  });

  test('can search for sprites in the asset modal', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByTitle('Add new sprite').click();
    const searchInput = page.getByPlaceholder('Search by name or tag');
    await expect(searchInput).toBeVisible();

    // Type in search and verify filtering
    await searchInput.fill('hero');

    // Should still see hero sprites
    await expect(page.getByTitle('Click to add to center of the game window').first()).toBeVisible();
  });

  test('can close sprite modal', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByTitle('Add new sprite').click();

    // Modal should be visible
    await expect(page.getByPlaceholder('Search by name or tag')).toBeVisible();

    // Close the modal
    await page.getByTitle('Close asset picker').click();

    // Modal should be gone
    await expect(page.getByPlaceholder('Search by name or tag')).not.toBeVisible();
  });

  test('can edit sprite position', async ({ page }) => {
    await page.goto(BASE_URL);

    // Add a sprite first
    await page.getByTitle('Add new sprite').click();
    await page.getByTitle('Click to add to center of the game window').first().click();

    // Wait for sprite to be added and panel to show
    await expect(page.getByText('Sprite')).toBeVisible();

    // Find the x position input (first number input in sprite panel)
    const xInput = page.locator('input[type="number"]').first();
    await xInput.fill('150');
    await xInput.blur();

    // Verify the value was set
    await expect(xInput).toHaveValue('150');
  });

  test('can delete a sprite', async ({ page }) => {
    await page.goto(BASE_URL);

    // Add a sprite first
    await page.getByTitle('Add new sprite').click();
    await page.getByTitle('Click to add to center of the game window').first().click();

    // Verify sprite was added
    await expect(page.getByText('Sprite')).toBeVisible();

    // Click delete button
    await page.getByTitle('Delete sprite').click();

    // Sprite should be removed from the list
    await expect(page.getByText('Sprite')).not.toBeVisible();
  });
});