import { IHandler } from '@scraper/shared/modules/browser/models/IBrowser';

import instagramConfig from '@config/instagram';

import SignInPage from '@modules/signin/infra/puppeteer/pages/SignInPage';

class SignInHandler implements IHandler {
  public async handle(): Promise<void> {
    const signInPage = new SignInPage();

    await signInPage.navigateTo();

    const { username, password } = instagramConfig;

    await signInPage.signIn({ username, password });
  }
}

export default SignInHandler;
