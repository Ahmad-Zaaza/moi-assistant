import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { test as baseTest } from "@playwright/test";

declare global {
  interface Window {
    collectIstanbulCoverage: (coverage: string) => void;
    __coverage__: string;
  }
}

const istanbulCLIOutput = path.join(process.cwd(), ".nyc_output");

export function generateUUID(): string {
  return crypto.randomBytes(16).toString("hex");
}

export const test = baseTest.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      window.addEventListener("beforeunload", () => {
        window.collectIstanbulCoverage(JSON.stringify(window.__coverage__));
      });
    });
    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true });
    await context.exposeFunction(
      "collectIstanbulCoverage",
      (coverageJSON: string) => {
        if (coverageJSON)
          fs.writeFileSync(
            path.join(
              istanbulCLIOutput,
              `playwright_coverage_${generateUUID()}.json`
            ),
            coverageJSON
          );
      }
    );
    await use(context);
    for (const page of context.pages()) {
      await page.evaluate(() => {
        window.collectIstanbulCoverage(JSON.stringify(window.__coverage__));
      });
    }
  },
});

export const expect = test.expect;