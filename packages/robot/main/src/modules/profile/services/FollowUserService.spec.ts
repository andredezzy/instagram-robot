import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import instagramConfig from '@config/instagram';

import AuthenticateUserService from '@modules/signin/services/AuthenticateUserService';
import NavigateToSignInPageService from '@modules/signin/services/NavigateToSignInPageService';

import FollowUserService from './FollowUserService';
import NavigateToProfileService from './NavigateToProfileService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let navigateToSignInPage: NavigateToSignInPageService;
let authenticateUser: AuthenticateUserService;
let navigateToProfile: NavigateToProfileService;
let followUser: FollowUserService;

let browser: Browser;
let page: Page;

describe('FollowUser', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    navigateToSignInPage = new NavigateToSignInPageService(page);
    authenticateUser = new AuthenticateUserService(page);
    navigateToProfile = new NavigateToProfileService(page);
    followUser = new FollowUserService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to follow user', async () => {
    await navigateToSignInPage.execute();

    const { username, password } = instagramConfig.testing.account;

    await authenticateUser.execute({
      username,
      password,
    });

    const { url: profile_url } = instagramConfig.testing.profile;

    await navigateToProfile.execute({ profile_url });

    const findElementsBySelector = jest.spyOn(page, 'findElementsBySelector');

    await followUser.execute();

    expect(findElementsBySelector).toHaveBeenCalled();
  });
});
