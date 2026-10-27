import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  testMatch: 'landing.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:5181',
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run dev -- --port 5181 --strictPort',
      url: 'http://127.0.0.1:5181',
      reuseExistingServer: false,
      env: { VITE_LEAD_ENDPOINT: 'http://127.0.0.1:5181/__test/lead' },
    },
    {
      command: 'npm run dev -- --port 5182 --strictPort',
      url: 'http://127.0.0.1:5182',
      reuseExistingServer: false,
      env: { VITE_LEAD_ENDPOINT: '' },
    },
  ],
})
