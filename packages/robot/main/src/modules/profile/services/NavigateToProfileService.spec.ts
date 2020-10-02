import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import instagramConfig from '@config/instagram';

import AuthenticateUserService from '@modules/signin/services/AuthenticateUserService';
import NavigateToSignInPageService from '@modules/signin/services/NavigateToSignInPageService';

import NavigateToProfileService from './NavigateToProfileService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let navigateToSignInPage: NavigateToSignInPageService;
let authenticateUser: AuthenticateUserService;
let navigateToProfile: NavigateToProfileService;

let browser: Browser;
let page: Page;

describe('NavigateToProfile', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    navigateToSignInPage = new NavigateToSignInPageService(page);
    authenticateUser = new AuthenticateUserService(page);
    navigateToProfile = new NavigateToProfileService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to navigate to profile page', async () => {
    await navigateToSignInPage.execute();

    const { username, password } = instagramConfig.testing.account;

    await authenticateUser.execute({
      username,
      password,
    });

    const { url: profile_url } = instagramConfig.testing.profile;

    const goTo = jest.spyOn(page, 'goTo');

    await navigateToProfile.execute({ profile_url });

    expect(goTo).toHaveBeenCalled();
  });
});
