import { container, injectable, inject } from 'tsyringe';

import Browser from '@scraper/shared/modules/browser/infra/puppeteer/models/Browser';
import IBrowser from '@scraper/shared/modules/browser/models/IBrowser';
import IPage from '@scraper/shared/modules/browser/models/IPage';
import IBrowserProvider from '@scraper/shared/modules/browser/providers/BrowserProvider/models/IBrowserProvider';

import Timer from '@utils/timer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import SignInHandler from '@modules/signin/infra/handlers';

interface IRequest {
  username: string;
  password: string;
  headless?: boolean;
  verbose?: boolean;
}

@injectable()
export default class Launcher {
  constructor(
    @inject('BrowserProvider')
    private browserProvider: IBrowserProvider<Browser>,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async launch({
    username,
    password,
    headless,
    verbose,
  }: IRequest): Promise<void> {
    const log = (str: string) => {
      if (verbose) {
        console.log(str);
      }
    };

    const timer = new Timer(`instagram-robot-${username}`);

    timer.start();

    const browser = await this.browserProvider.launch({ headless });
    const page = await browser.newPage();

    container.registerInstance<IBrowser<any, any>>('Browser', browser);
    container.registerInstance<IPage<any>>('Page', page);

    browser.run(page, SignInHandler);

    timer.stop();

    const formattedTimer = timer.format();

    console.log(`\nElapsed time: ${formattedTimer}`);
  }
}
