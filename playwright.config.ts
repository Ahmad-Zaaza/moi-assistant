import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
config();
config({ path: ".env.local" });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["junit", { outputFile: "results.xml" }]],
  timeout: 60000,
  snapshotPathTemplate: "tests/e2e/{testFilePath}-snapshots/{arg}{ext}",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.TEST_BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "e2e tests",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "cleanup",
      testMatch: /.*\.teardown\.ts/,
      dependencies: ["e2e tests"],
    },
  ],
});
