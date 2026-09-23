import { expect, test } from "@playwright/test";

test("builds a fair exchange and copies config", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Trade qualified reach/i })).toBeVisible();
  await page.getByRole("button", { name: /Build fair exchange/i }).click();
  await expect(page.getByText("100% balanced")).toBeVisible();
  await expect(page.getByText("2,133")).toBeVisible();
  await page.getByRole("button", { name: /Copy demo config/i }).click();
  await expect(page.getByRole("button", { name: /Config copied/i })).toBeVisible();
});

test("switches partners and validates bad input", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /Meal Mosaic/i }).click();
  await expect(page.getByText("48% overlap")).toBeVisible();
  await page.getByLabel("Impressions to exchange").fill("0");
  await page.getByRole("button", { name: /Build fair exchange/i }).click();
  await expect(page.getByText(/Enter 100–3,600 whole impressions/)).toBeVisible();
});

test("has no mobile horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
