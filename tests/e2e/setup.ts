import { test as base } from '@playwright/test';

// Extend base test with custom fixtures if needed
export const test = base;
export { expect } from '@playwright/test';
