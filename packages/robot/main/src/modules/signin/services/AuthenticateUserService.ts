import { injectable, inject } from 'tsyringe';

import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import sleep from '@utils/sleep';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute({ username, password }: IRequest): Promise<boolean> {
    await this.page.type('form#loginForm input[name="username"]', username, {
      delay: 100,
    });

    await this.page.type('form#loginForm input[name="password"]', password, {
      delay: 100,
    });

    let tryToLogin = true;
    let attempts = 0;

    while (tryToLogin && attempts < 3) {
      try {
        const [findLogInButtonElement] = await this.page.findElementsByText(
          'Log In',
          'button/div',
        );

        await this.page.clickForNavigate(findLogInButtonElement);

        tryToLogin = false;
      } catch {
        const [
          findSignInErrorMessageElement,
        ] = await this.page.findElementsBySelector(
          'div p#slfErrorAlert[role="alert"]',
        );

        if (findSignInErrorMessageElement) {
          await sleep(120000 + 60000 * attempts);
        } else {
          tryToLogin = false;
        }
      }

      attempts++;
    }

    return true;
  }
}
