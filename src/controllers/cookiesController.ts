import { Request, Response, NextFunction } from 'express';
import { Page } from 'playwright';
import { getBrowser } from '../server.js';
import { limit } from '../concurrencyLimiter.js';

export const getCookies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Missing username or password.');
  }

  try {
    // Use the limiter to control concurrency
    const cookies = await limit(async () => {
      const browser = await getBrowser();
      const page: Page = await browser.newPage();

      try {
        await page.goto('https://referralmanager.churchofjesuschrist.org');

        // username input logic
        await page.waitForSelector('#username-input', {
          state: 'visible',
          timeout: 10000,
        });
        await page.fill('#username-input', String(username));
        await page.click('#button-primary');

        // password input logic
        await page.waitForSelector('#password-input', {
          state: 'visible',
          timeout: 10000,
        });
        await page.fill('#password-input', String(password));
        await page.click('#button-primary');

        await page.waitForNavigation({
          waitUntil: 'networkidle',
          timeout: 20000,
        });

        return await page.context().cookies();
      } finally {
        await page.close();
      }
    });

    res.status(200).json(cookies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
