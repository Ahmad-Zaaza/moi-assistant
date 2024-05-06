export const AuthStateFolderPath = "tests/e2e/.auth";

export const getAuthStateFilePath = (role: "admin") =>
  `${AuthStateFolderPath}/${role}.json`;
