import puppeteer from 'puppeteer';

import IGoToOptionsDTO from '@robot/shared/modules/browser/dtos/IGoToOptionsDTO';
import IPage from '@robot/shared/modules/browser/models/IPage';

class Page implements IPage<puppeteer.Page> {
  constructor(public driver: puppeteer.Page) {}

  public async goTo(
    url: string,
    options?: IGoToOptionsDTO,
  ): Promise<puppeteer.Response> {
    const response = this.driver.goto(url, {
      waitUntil: 'networkidle2',
      ...options,
    });

    await this.driver.setExtraHTTPHeaders({
      'Accept-Language': 'en',
    });

    await this.driver.evaluateOnNewDocument(() => {
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

    return response;
  }

  public async select(
    selector: string,
    ...values: string[]
  ): Promise<string[]> {
    await this.driver.waitForSelector(selector);

    return this.driver.select(selector, ...values);
  }

  public async type(
    selector: string,
    text: string,
    options?: { delay: number },
  ): Promise<void> {
    await this.driver.waitForSelector(selector);

    await this.driver.click(selector);

    await this.driver.type(selector, String(text), options);
  }

  public async typeToElement(
    element: puppeteer.ElementHandle,
    text: string,
    options?: { delay: number },
  ): Promise<void> {
    await element.click();

    await element.type(String(text), options);
  }

  public async findElementsBySelector(
    selector: string,
  ): Promise<puppeteer.ElementHandle[]> {
    const elements = await this.driver.$$(selector);

    return elements;
  }

  public async findElementsByText(
    str: string,
    elementTag = '*',
    restPath = '',
  ): Promise<puppeteer.ElementHandle[]> {
    const elements = await this.driver.$x(
      `//${elementTag}[contains(text(), '${str}')]${restPath}`,
    );

    return elements;
  }

  public async clickForNavigate(
    element: puppeteer.ElementHandle<Element>,
  ): Promise<void> {
    await element.click();

    await this.driver.waitForNavigation({ waitUntil: 'networkidle2' });
  }

  evaluate<T = void, A = puppeteer.SerializableOrJSHandle>(
    fn: (...args: A[]) => T,
    ...args: A[]
  ): Promise<T> {
    return this.driver.evaluate(fn, ...(args as any[])) as Promise<T>;
  }
}

export default Page;
