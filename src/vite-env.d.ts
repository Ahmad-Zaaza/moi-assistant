/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  VITE_AUTH_URL: string;
  VITE_AUTH_REALM: string;
  VITE_AUTH_CLIENT: string;
  VITE_TRACKING_ENABLED: "enabled" | "disabled";
  VITE_TRACKING_ENV: string;
  TEST_ADMIN_ROLE_USERNAME: string;
}

declare const __PACKAGE_JSON_VERSION__: string;
declare const __COMMIT_HASH__: string;
