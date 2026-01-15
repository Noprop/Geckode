import { expect, test } from '@playwright/test';
const BASE_URL = 'http://localhost:3000/';

test.describe('Game Controls', () => {
  test('game canvas is visible', async ({ page }) => {
    await page.goto(BASE_URL);

    const gameContainer = page.locator('#game-container');
    await expect(gameContainer).toBeVisible();
  });

  test('can pause the game', async ({ page }) => {
    await page.goto(BASE_URL);

    // Game starts unpaused, so pause button should be visible
    const pauseButton = page.getByTitle('Pause');
    await expect(pauseButton).toBeVisible();

    // Click pause
    await pauseButton.click();

    // Now play button should be visible
    await expect(page.getByTitle('Play')).toBeVisible();
  });

  test('can resume the game', async ({ page }) => {
    await page.goto(BASE_URL);

    // Pause the game first
    await page.getByTitle('Pause').click();

    // Play button should be visible
    const playButton = page.getByTitle('Play');
    await expect(playButton).toBeVisible();

    // Click play to resume
    await playButton.click();

    // Pause button should be back
    await expect(page.getByTitle('Pause')).toBeVisible();
  });

  test('play/pause toggles correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Start: Pause button visible (game running)
    await expect(page.getByTitle('Pause')).toBeVisible();

    // Toggle 1: Pause -> Play button
    await page.getByTitle('Pause').click();
    await expect(page.getByTitle('Play')).toBeVisible();

    // Toggle 2: Play -> Pause button
    await page.getByTitle('Play').click();
    await expect(page.getByTitle('Pause')).toBeVisible();

    // Toggle 3: Pause -> Play button
    await page.getByTitle('Pause').click();
    await expect(page.getByTitle('Play')).toBeVisible();
  });
});