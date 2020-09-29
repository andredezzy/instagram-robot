import { container, injectable, inject } from 'tsyringe';

import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import IBrowser from '@robot/shared/modules/browser/models/IBrowser';
import IPage from '@robot/shared/modules/browser/models/IPage';
import IBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/models/IBrowserProvider';

import Timer from '@utils/timer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IConfigurationProvider from '@shared/container/providers/ConfigurationProvider/models/IConfigurationProvider';

import PostHandler from '@modules/post/infra/handlers';
import SignInHandler from '@modules/signin/infra/handlers';

@injectable()
export default class Launcher {
  constructor(
    @inject('ConfigurationProvider')
    private configurationProvider: IConfigurationProvider,

    @inject('BrowserProvider')
    private browserProvider: IBrowserProvider<Browser>,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async launch(): Promise<void> {
    const { username, headless } = await this.configurationProvider.pick([
      'username',
      'headless',
    ]);

    const timer = new Timer(`instagram-robot-${username}`);

    timer.start();

    const browser = await this.browserProvider.launch({ headless });
    const page = await browser.newPage();

    container.registerInstance<IBrowser<any, any>>('Browser', browser);
    container.registerInstance<IPage<any>>('Page', page);

    await browser.run(page, SignInHandler, PostHandler);

    timer.stop();

    const formattedTimer = timer.format();

    console.log(`\nElapsed time: ${formattedTimer}`);
  }
}
