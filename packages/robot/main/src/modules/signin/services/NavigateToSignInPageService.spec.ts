import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import NavigateToSignInPageService from './NavigateToSignInPageService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let navigateToSignInPage: NavigateToSignInPageService;

let browser: Browser;
let page: Page;

describe('NavigateToSignInPage', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    navigateToSignInPage = new NavigateToSignInPageService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to navigate to sign in page', async () => {
    const goTo = jest.spyOn(page, 'goTo');

    await navigateToSignInPage.execute();

    expect(goTo).toHaveBeenCalled();
  });
});
