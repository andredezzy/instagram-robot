import Browser from '@robot/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@robot/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import instagramConfig from '@config/instagram';

import AuthenticateUserService from '@modules/signin/services/AuthenticateUserService';
import NavigateToSignInPageService from '@modules/signin/services/NavigateToSignInPageService';

import CreateCommentService from './CreateCommentService';
import NavigateToPostPageService from './NavigateToPostPageService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let navigateToSignInPage: NavigateToSignInPageService;
let authenticateUser: AuthenticateUserService;
let navigateToPostPage: NavigateToPostPageService;
let createComment: CreateCommentService;

let browser: Browser;
let page: Page;

describe('CreateComment', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    navigateToSignInPage = new NavigateToSignInPageService(page);
    authenticateUser = new AuthenticateUserService(page);
    navigateToPostPage = new NavigateToPostPageService(page);
    createComment = new CreateCommentService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to create comment', async () => {
    await navigateToSignInPage.execute();

    const { username, password } = instagramConfig.testing.account;

    await authenticateUser.execute({
      username,
      password,
    });

    const { url: post_url } = instagramConfig.testing.post;

    await navigateToPostPage.execute({ post_url });

    const typeToElement = jest.spyOn(page, 'typeToElement');

    await createComment.execute({ message: '🔥🔥🔥' });

    expect(typeToElement).toHaveBeenCalled();
  });
});
