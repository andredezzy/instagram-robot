import { inject, injectable } from 'tsyringe';

import { IHandler } from '@robot/shared/modules/browser/models/IBrowser';

import IConfigurationProvider from '@shared/container/providers/ConfigurationProvider/models/IConfigurationProvider';

import SignInPage from '@modules/signin/infra/puppeteer/pages/SignInPage';

@injectable()
class SignInHandler implements IHandler {
  constructor(
    @inject('ConfigurationProvider')
    private configurationProvider: IConfigurationProvider,
  ) {}

  public async handle(): Promise<void> {
    const signInPage = new SignInPage();

    await signInPage.navigateTo();

    const { username, password } = await this.configurationProvider.pick([
      'username',
      'password',
    ]);

    await signInPage.signIn({ username, password });
  }
}

export default SignInHandler;
