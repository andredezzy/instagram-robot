import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import instagramConfig from '@config/instagram';

import AuthenticateUserService from './AuthenticateUserService';
import NavigateToSignInPageService from './NavigateToSignInPageService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let navigateToSignInPage: NavigateToSignInPageService;
let authenticateUser: AuthenticateUserService;

let browser: Browser;
let page: Page;

describe('AuthenticateUser', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    navigateToSignInPage = new NavigateToSignInPageService(page);
    authenticateUser = new AuthenticateUserService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to authenticate user', async () => {
    await navigateToSignInPage.execute();

    const { username, password } = instagramConfig.testing.account;

    await authenticateUser.execute({
      username,
      password,
    });

    const [findUserAvatarImgElement] = await page.findElementsBySelector(
      'img[data-testid="user-avatar"]',
    );

    expect(findUserAvatarImgElement).toBeTruthy();
  });
});
