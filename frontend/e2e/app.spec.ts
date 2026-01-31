import { test, expect } from "@playwright/test";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

test.describe("Auto Chess Encyclopedia E2E", () => {
  test.beforeAll(async () => {
    // Import game data before running tests
    try {
      await fetch(`${BACKEND_URL}/api/import`, { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.error("Backend not available, skipping data import");
    }
  });

  test("home page loads and has navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Auto Chess Encyclopedia");

    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/heroes"]').first()).toBeVisible();
    await expect(page.locator('a[href="/races"]').first()).toBeVisible();
    await expect(page.locator('a[href="/classes"]').first()).toBeVisible();
    await expect(page.locator('a[href="/squad"]').first()).toBeVisible();
  });

  test("heroes page displays heroes", async ({ page }) => {
    await page.goto("/heroes");

    await expect(page.locator("h2")).toContainText("Heroes");
    await expect(page.locator(".hero-card")).toHaveCount(26);
  });

  test("races page displays races", async ({ page }) => {
    await page.goto("/races");

    await expect(page.locator("h2")).toContainText("Races");
    await expect(page.locator(".race-card")).toHaveCount(22);
  });

  test("classes page displays classes", async ({ page }) => {
    await page.goto("/classes");

    await expect(page.locator("h2")).toContainText("Classes");
    await expect(page.locator(".class-card")).toHaveCount(21);
  });

  test("squad builder page loads", async ({ page }) => {
    await page.goto("/squad");

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("h2")).toContainText("Squad Builder");
    await expect(page.locator(".squad-grid")).toBeVisible();
    await expect(page.locator(".hero-palette")).toBeVisible();
    await expect(page.locator(".slot")).toHaveCount(9);
  });

  test("squad builder slot selection works", async ({ page }) => {
    await page.goto("/squad");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const slots = page.locator(".slot");
    await expect(slots).toHaveCount(9);

    const firstSlot = slots.first();
    await firstSlot.click();

    await expect(page.locator(".slot-indicator")).toContainText(
      "Selecting for Slot 1",
    );
  });

  test("navigation works between pages", async ({ page }) => {
    await page.goto("/");

    await page.locator('a[href="/heroes"]').first().click();
    await expect(page).toHaveURL("/heroes");
    await expect(page.locator("h2")).toContainText("Heroes");

    await page.locator('a[href="/races"]').click();
    await expect(page).toHaveURL("/races");
    await expect(page.locator("h2")).toContainText("Races");

    await page.locator('a[href="/classes"]').click();
    await expect(page).toHaveURL("/classes");
    await expect(page.locator("h2")).toContainText("Classes");

    await page.locator('a[href="/squad"]').click();
    await expect(page).toHaveURL("/squad");
    await page.waitForTimeout(1000);
    await expect(page.locator("h2")).toContainText("Squad Builder");

    await page.locator('a[href="/"]').click();
    await expect(page).toHaveURL("/");
  });

  test("hero cards display correct data", async ({ page }) => {
    await page.goto("/heroes");

    const firstHero = page.locator(".hero-card").first();
    await expect(firstHero.locator(".hero-name")).toBeVisible();
    await expect(firstHero.locator(".hero-quality")).toBeVisible();
    await expect(firstHero.locator(".hero-cost")).toBeVisible();
    await expect(firstHero.locator(".ability-name")).toBeVisible();
  });

  test("squad builder search and filter works", async ({ page }) => {
    await page.goto("/squad");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const searchInput = page.locator(".search-input");
    await searchInput.fill("axe");

    const heroCards = page.locator(".hero-card");
    const count = await heroCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test("squad builder quality filter works", async ({ page }) => {
    await page.goto("/squad");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const filterSelect = page.locator(".filter-select");
    await filterSelect.selectOption("legendary");

    const heroCards = page.locator(".hero-card");
    const count = await heroCards.count();

    expect(count).toBeGreaterThan(0);
  });
});
