import { inject, injectable } from 'tsyringe';

import AppError from '@robot/shared/errors/AppError';
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

    const result = await signInPage.signIn({ username, password });

    if (result) {
      throw new AppError('It was not able to sign in.');
    }
  }
}

export default SignInHandler;
