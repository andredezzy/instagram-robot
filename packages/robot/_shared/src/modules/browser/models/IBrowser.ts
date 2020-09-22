import puppeteer from 'puppeteer';

import IGoToOptionsDTO from '../dtos/IGoToOptionsDTO';
import IPage from './IPage';

export type Handler = new (...args: any[]) => IHandler;

export interface IHandler {
  handle(browser: IBrowser<any, any>, page: IPage<any>): Promise<void>;
}

export default interface IBrowser<Browser, Page extends IPage<any>> {
  driver: Browser;

  newPage(): Promise<Page>;

  newPageAndGoTo(
    url: string,
    options?: IGoToOptionsDTO,
  ): Promise<puppeteer.Response | null>;

  use(...handlers: Handler[]): Promise<void>;

  run(page: IPage<any>, ...handlers: Handler[]): Promise<void>;

  close(): Promise<void>;
}
