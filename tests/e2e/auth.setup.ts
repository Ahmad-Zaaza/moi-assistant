import fs from "fs";
import { expect, test as setup } from "./baseFixtures.ts";
import { getAuthStateFilePath } from "./e2e.utils";

const credentials = {
  admin: {
    username: process.env.TEST_ADMIN_ROLE_USERNAME,
    password: process.env.TEST_ADMIN_ROLE_PASSWORD,
  },
};

setup("Authenticate as Admin", async ({ page }) => {
  if (!credentials.admin.username || !credentials.admin.password) {
    throw new Error(
      "Admin credentials are not defined. Add TEST_ADMIN_ROLE_USERNAME to .env and TEST_ADMIN_ROLE_PASSWORD to .env.local"
    );
  }

  // don't login if auth file for admin exists
  if (fs.existsSync(getAuthStateFilePath("admin"))) {
    return;
  }

  await page.goto("/");
  await page.getByLabel(/Username or email/i).fill(credentials.admin.username);
  await page.getByLabel(/Password/i).fill(credentials.admin.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  // Check if the div with id "root" exists on the page, meaning the react app in the DOM
  await expect(page.locator("#root")).toBeVisible();
  await page.context().storageState({ path: getAuthStateFilePath("admin") });
});
