import { LaunchOptions } from 'puppeteer';

import IBrowser from '@robot/shared/modules/browser/models/IBrowser';

export default interface IBrowserProvider<Browser extends IBrowser<any, any>> {
  launch(options?: LaunchOptions): Promise<Browser>;
}
