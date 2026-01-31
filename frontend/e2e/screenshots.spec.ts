import { test, expect } from "@playwright/test";

const BACKEND_URL = "http://localhost:5000";
const SCREENSHOT_DIR = "./test-results/screenshots";

test.describe("Screenshot Tests", () => {
  test.beforeAll(async () => {
    try {
      await fetch(`${BACKEND_URL}/api/import`, { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.error("Backend not available");
    }
  });

  test("capture home page screenshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/home.png`,
      fullPage: true,
    });
  });

  test("capture heroes page screenshot", async ({ page }) => {
    await page.goto("/heroes");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/heroes.png`,
      fullPage: true,
    });
  });

  test("capture races page screenshot", async ({ page }) => {
    await page.goto("/races");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/races.png`,
      fullPage: true,
    });
  });

  test("capture classes page screenshot", async ({ page }) => {
    await page.goto("/classes");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/classes.png`,
      fullPage: true,
    });
  });

  test("capture squad builder page screenshot", async ({ page }) => {
    await page.goto("/squad");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/squad.png`,
      fullPage: true,
    });
  });
});
