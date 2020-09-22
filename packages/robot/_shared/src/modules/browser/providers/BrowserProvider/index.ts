import { container } from 'tsyringe';

import PuppeteerBrowserProvider from './implementations/PuppeteerBrowserProvider';
import IBrowserProvider from './models/IBrowserProvider';

const providers = {
  puppeteer: PuppeteerBrowserProvider,
};

container.registerSingleton<IBrowserProvider<any>>(
  'BrowserProvider',
  providers.puppeteer,
);
