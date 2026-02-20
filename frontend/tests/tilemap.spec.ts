import { expect, test, type Page } from '@playwright/test';
const BASE_URL = 'http://localhost:3000/';

test.describe('Tilemap Editor', () => {
  // Helper to navigate to the tilemap view
  async function goToTilemap(page: Page) {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Tilemap' }).click();
  }

  // ── Navigation & Layout ──────────────────────────────────────────────────

  test('tilemap editor loads when tab clicked', async ({ page }) => {
    await goToTilemap(page);

    await expect(page.getByTitle('Place tile (pen)')).toBeVisible();
    await expect(page.getByTitle('Eraser')).toBeVisible();
    await expect(page.getByTitle('Save tilemap to scene')).toBeVisible();
  });

  // ── Tool Selection ───────────────────────────────────────────────────────

  test('place tool is selected by default', async ({ page }) => {
    await goToTilemap(page);

    const placeTool = page.getByTitle('Place tile (pen)');
    await expect(placeTool).toHaveClass(/bg-primary-green/);
  });

  test('can switch between tools', async ({ page }) => {
    await goToTilemap(page);

    const tools = [
      'Eraser',
      'Bucket fill',
      'Line tool',
      'Rectangle tool',
      'Oval tool',
      'Place tile (pen)',
    ];

    for (const toolTitle of tools) {
      await page.getByTitle(toolTitle).click();
      await expect(page.getByTitle(toolTitle)).toHaveClass(/bg-primary-green/);
    }
  });

  // ── Brush Size ───────────────────────────────────────────────────────────

  test('1x1 brush is selected by default', async ({ page }) => {
    await goToTilemap(page);

    await expect(page.getByTitle('1x1 brush')).toHaveClass(/bg-primary-green/);
  });

  test('can change brush size', async ({ page }) => {
    await goToTilemap(page);

    await page.getByTitle('2x2 brush').click();
    await expect(page.getByTitle('2x2 brush')).toHaveClass(/bg-primary-green/);

    await page.getByTitle('3x3 brush').click();
    await expect(page.getByTitle('3x3 brush')).toHaveClass(/bg-primary-green/);

    await page.getByTitle('1x1 brush').click();
    await expect(page.getByTitle('1x1 brush')).toHaveClass(/bg-primary-green/);
  });

  // ── Grid Resize ──────────────────────────────────────────────────────────

  test('can resize grid width', async ({ page }) => {
    await goToTilemap(page);

    const widthInput = page.getByTitle('Grid width (tiles)');
    await widthInput.fill('20');
    await widthInput.blur();
    await expect(widthInput).toHaveValue('20');
  });

  test('can resize grid height', async ({ page }) => {
    await goToTilemap(page);

    const heightInput = page.getByTitle('Grid height (tiles)');
    await heightInput.fill('24');
    await heightInput.blur();
    await expect(heightInput).toHaveValue('24');
  });

  test('grid size clamps to valid range', async ({ page }) => {
    await goToTilemap(page);

    const widthInput = page.getByTitle('Grid width (tiles)');

    // Below min — should clamp to 1
    await widthInput.fill('0');
    await widthInput.blur();
    await expect(widthInput).toHaveValue('1');

    // Above max — should clamp to 128
    await widthInput.fill('200');
    await widthInput.blur();
    await expect(widthInput).toHaveValue('128');
  });

  // ── Zoom Controls ────────────────────────────────────────────────────────

  test('can zoom in and out', async ({ page }) => {
    await goToTilemap(page);

    const zoomBtn = page.getByTitle('Click to edit zoom (100% = fit to container)');
    const initialZoom = await zoomBtn.textContent();

    await page.getByTitle('Zoom in').click();
    const zoomedIn = await zoomBtn.textContent();
    expect(zoomedIn).not.toBe(initialZoom);

    await page.getByTitle('Zoom out').click();
    const zoomedBack = await zoomBtn.textContent();
    expect(zoomedBack).toBe(initialZoom);
  });

  test('can edit zoom percentage directly', async ({ page }) => {
    await goToTilemap(page);

    await page.getByTitle('Click to edit zoom (100% = fit to container)').click();
    // Input is autoFocused and onFocus selects all — type new value to replace
    await page.keyboard.type('150');
    await page.keyboard.press('Enter');

    await expect(page.getByTitle('Click to edit zoom (100% = fit to container)')).toContainText('150');
  });

  // ── Undo / Redo ──────────────────────────────────────────────────────────

  test('undo and redo buttons exist', async ({ page }) => {
    await goToTilemap(page);

    await expect(page.getByTitle('Undo (Ctrl+Z)')).toBeVisible();
    await expect(page.getByTitle('Redo (Ctrl+Shift+Z)')).toBeVisible();
  });

  // ── Save & Clear ─────────────────────────────────────────────────────────

  test('save button exists and is clickable', async ({ page }) => {
    await goToTilemap(page);

    const saveBtn = page.getByTitle('Save tilemap to scene');
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toBeEnabled();
  });

  test('clear button exists and is clickable', async ({ page }) => {
    await goToTilemap(page);

    const clearBtn = page.getByTitle('Clear tilemap');
    await expect(clearBtn).toBeVisible();
    await expect(clearBtn).toBeEnabled();
  });

  // ── Collidables Toggle ───────────────────────────────────────────────────

  test('can toggle show collidables checkbox', async ({ page }) => {
    await goToTilemap(page);

    const checkbox = page.getByLabel('Show collidables');
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  // ── Tileset Panel ────────────────────────────────────────────────────────

  test('tileset selector is visible', async ({ page }) => {
    await goToTilemap(page);

    await expect(page.getByTitle('Active tilemap tileset')).toBeVisible();
  });

  test('edit and delete tile buttons exist', async ({ page }) => {
    await goToTilemap(page);

    await expect(page.getByTitle('Edit selected tile')).toBeVisible();
    await expect(page.getByTitle('Delete selected tile from tileset')).toBeVisible();
  });
});
