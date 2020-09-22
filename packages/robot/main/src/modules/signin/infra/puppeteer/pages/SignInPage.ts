import { container } from 'tsyringe';

import ISignInCredentialsDTO from '@modules/signin/dtos/ISignInCredentialsDTO';
import ISignInPage from '@modules/signin/pages/ISignInPage';
import AuthenticateUserService from '@modules/signin/services/AuthenticateUserService';
import NavigateToSignInPageService from '@modules/signin/services/NavigateToSignInPageService';

class SignInPage implements ISignInPage {
  public async navigateTo(): Promise<void> {
    const navigateToSignInPage = container.resolve(NavigateToSignInPageService);

    await navigateToSignInPage.execute();
  }

  public async signIn({
    username,
    password,
  }: ISignInCredentialsDTO): Promise<boolean> {
    const authenticateUser = container.resolve(AuthenticateUserService);

    const result = await authenticateUser.execute({ username, password });

    return result;
  }
}

export default SignInPage;
