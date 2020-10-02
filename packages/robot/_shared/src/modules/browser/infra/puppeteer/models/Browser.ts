import puppeteer from 'puppeteer';
import { container } from 'tsyringe';

import IGoToOptionsDTO from '@robot/shared/modules/browser/dtos/IGoToOptionsDTO';
import IBrowser, {
  Handler,
} from '@robot/shared/modules/browser/models/IBrowser';

import Page from './Page';

class Browser implements IBrowser<puppeteer.Browser, Page> {
  private handlers: Handler[] = [];

  constructor(public driver: puppeteer.Browser) {}

  public async newPage(): Promise<Page> {
    const page = await this.driver.newPage();

    await page.setViewport({
      width: 1366,
      height: 768,
    });

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en',
    });

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', {
        get() {
          return 'en';
        },
      });
      Object.defineProperty(navigator, 'languages', {
        get() {
          return ['en'];
        },
      });
    });

    return new Page(page);
  }

  public async newPageAndGoTo(
    url: string,
    options?: IGoToOptionsDTO,
  ): Promise<puppeteer.Response | null> {
    const page = await this.newPage();

    await page.driver.setViewport({
      width: 1366,
      height: 768,
    });

    return page.goTo(url, options);
  }

  public async use(...handlers: Handler[]): Promise<void> {
    this.handlers.push(...handlers);
  }

  public async run(page: Page, ...handlers: Handler[]): Promise<void> {
    for (const handlerToken of handlers) {
      const handler = container.resolve(handlerToken);

      await handler.handle(this, page);

      if (handlers.indexOf(handlerToken) < handlers.length - 1) {
        for (const usedHandlerToken of this.handlers) {
          const usedHandler = container.resolve(usedHandlerToken);

          await usedHandler.handle(this, page);
        }
      }
    }
  }

  public async close(): Promise<void> {
    await this.driver.close();
  }
}

export default Browser;
