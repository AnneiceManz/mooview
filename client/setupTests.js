import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

//Extends vitest expect with jest-dom matchers
expect.extend(matchers);

//Runs a cleanup after each test
afterEach(() => {
    cleanup();
});