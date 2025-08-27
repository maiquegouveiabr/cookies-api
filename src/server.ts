import { Browser, chromium } from 'playwright';
import app from './app.js';
import config from './config/config.js';

let browser: Browser | null = null;
// Reuse one browser instance, isolate requests with new contexts
export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({ args: ['--no-sandbox'], headless: true });
  }
  return browser;
}

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (browser) await browser.close();
  process.exit();
});
