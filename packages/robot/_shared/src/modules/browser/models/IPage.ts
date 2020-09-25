import puppeteer from 'puppeteer';

import IGoToOptionsDTO from '@robot/shared/modules/browser/dtos/IGoToOptionsDTO';

export default interface IPage<Page> {
  driver: Page;

  goTo(
    url: string,
    options?: IGoToOptionsDTO,
  ): Promise<puppeteer.Response | null>;
  select(selector: string, ...values: string[]): Promise<string[]>;
  type(
    selector: string,
    text: string,
    options?: { delay: number },
  ): Promise<void>;
  typeToElement(
    element: puppeteer.ElementHandle,
    text: string,
    options?: { delay: number },
  ): Promise<void>;
  findElementsBySelector(selector: string): Promise<puppeteer.ElementHandle[]>;
  findElementsByText(
    str: string,
    elementTag?: string,
  ): Promise<puppeteer.ElementHandle[]>;
  clickForNavigate(element: puppeteer.ElementHandle<Element>): Promise<void>;
  evaluate<T = void, A = puppeteer.SerializableOrJSHandle>(
    fn: (...args: A[]) => T,
    ...args: A[]
  ): Promise<T>;
}
