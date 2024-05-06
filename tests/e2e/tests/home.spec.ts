import { expect, test } from "../baseFixtures.ts";
import { getAuthStateFilePath } from "../e2e.utils";

test.describe("Home", () => {
  test.use({ storageState: getAuthStateFilePath("admin") });
  test("Homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Schools" })).toBeVisible();
  });
});
