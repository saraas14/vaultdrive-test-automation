import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Configuración única de Playwright para VaultDrive:
 *  - proyecto "api": pruebas de servicios REST (sin navegador) en api/tests
 *  - proyectos "chromium" y "firefox": pruebas Web GUI en web/tests
 * Todas las URLs y credenciales vienen de variables de entorno (.env).
 */
export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: process.env.CI === 'true',
  retries: process.env.CI === 'true' ? 1 : 0,
  workers: process.env.CI === 'true' ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit/resultados.xml' }],
  ],
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://localhost:5173',
    headless: process.env.HEADLESS !== 'false',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'api',
      testDir: './api/tests',
      use: { extraHTTPHeaders: { Accept: 'application/json' } },
    },
    { name: 'chromium', testDir: './web/tests', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', testDir: './web/tests', use: { ...devices['Desktop Firefox'] } },
  ],
});
