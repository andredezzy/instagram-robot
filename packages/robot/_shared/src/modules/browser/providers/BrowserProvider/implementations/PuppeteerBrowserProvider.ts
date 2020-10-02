import puppeteer, { LaunchOptions } from 'puppeteer';

import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';

import IBrowserProvider from '../models/IBrowserProvider';

class PuppeteerBrowserProvider implements IBrowserProvider<Browser> {
  public async launch(options?: LaunchOptions): Promise<Browser> {
    const browser = await puppeteer.launch({
      product: 'chrome',
      ignoreHTTPSErrors: true,
      args: [
        '--lang=en',
        '-wait-for-browser',
        '--ignore-certificate-errors',
        '--enable-features=NetworkService',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--shm-size=3gb',
      ],
      ...options,
    });

    return new Browser(browser);
  }
}

export default PuppeteerBrowserProvider;
