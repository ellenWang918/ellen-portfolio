import { expect, test } from "@playwright/test";

test("project dialog contains keyboard focus and restores the trigger", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Design System", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Design System & Governance" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("An enterprise travel platform serving more than 6,000 monthly active users.")).toBeVisible();
  await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);

  // Programmatic focus cannot escape into the inert background either.
  await page.locator(".site-header a").evaluate((element: HTMLAnchorElement) => element.focus());
  await expect(dialog.getByRole("button", { name: "Design System & Governance" })).toBeFocused();
  for (const key of ["Tab", "Shift+Tab"]) {
    for (let index = 0; index < 8; index++) {
      await page.keyboard.press(key);
      await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
  }

  const projectButton = dialog.getByRole("button", { name: "Feature Improvement", exact: true });
  if (!(await projectButton.isVisible())) {
    await dialog.getByRole("button", { name: "Design System & Governance", exact: true }).click();
  }
  await dialog.getByRole("button", { name: "Feature Improvement", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Feature Improvement" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("Escape and outside click dismiss the dialog and preserve scroll styles", async ({ page }) => {
  await page.goto("/");
  await page.locator("body").evaluate((element) => { element.style.overflow = "auto"; });
  const trigger = page.getByRole("button", { name: "Design System", exact: true });
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "auto");
  await page.goto("/");
  await trigger.click();
  await page.getByRole("dialog").click({ position: { x: 2, y: 2 } });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("About supports direct entry and returning home", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hey, you found my secret space!");
  await page.getByRole("button", { name: "Back to homepage" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
});
