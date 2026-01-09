import { expect, test } from '@playwright/test';
const BASE_URL = 'http://localhost:3000/';

test.describe('Blockly Workspace', () => {
  test('blockly workspace loads', async ({ page }) => {
    await page.goto(BASE_URL);

    const blocklyDiv = page.locator('#blocklyDiv');
    await expect(blocklyDiv).toBeVisible();
  });

  test('undo button disabled initially', async ({ page }) => {
    await page.goto(BASE_URL);

    const undoButton = page.getByTitle('Undo');
    await expect(undoButton).toBeVisible();
    await expect(undoButton).toBeDisabled();
  });

  test('can undo after adding sprite', async ({ page }) => {
    await page.goto(BASE_URL);

    // Add a sprite
    await page.getByTitle('Add new sprite').click();
    await page.getByTitle('Click to add to center of the game window').first().click();

    // Verify sprite was added
    await expect(page.getByText('Sprite')).toBeVisible();

    // Undo button should now be enabled
    const undoButton = page.getByTitle('Undo');
    await expect(undoButton).toBeEnabled();

    // Click undo
    await undoButton.click();

    // Sprite should be gone
    await expect(page.getByText('Sprite')).not.toBeVisible();
  });

  test('can redo after undo', async ({ page }) => {
    await page.goto(BASE_URL);

    // Add a sprite
    await page.getByTitle('Add new sprite').click();
    await page.getByTitle('Click to add to center of the game window').first().click();

    await expect(page.getByText('Sprite')).toBeVisible();

    // Undo the sprite addition
    await page.getByTitle('Undo').click();
    await expect(page.getByText('Sprite')).not.toBeVisible();

    // Redo button should be enabled
    const redoButton = page.getByTitle('Redo');
    await expect(redoButton).toBeEnabled();

    // Click redo
    await redoButton.click();

    // Sprite should reappear
    await expect(page.getByText('Sprite')).toBeVisible();
  });
});