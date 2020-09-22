import { LaunchOptions } from 'puppeteer';

import IBrowser from '@scraper/shared/modules/browser/models/IBrowser';

export default interface IBrowserProvider<Browser extends IBrowser<any, any>> {
  launch(options?: LaunchOptions): Promise<Browser>;
}
