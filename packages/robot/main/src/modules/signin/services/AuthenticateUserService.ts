import { injectable, inject } from 'tsyringe';

import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

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

    const [findLogInButtonElement] = await this.page.findElementsByText(
      'Log In',
      'button/div',
    );

    await this.page.clickForNavigate(findLogInButtonElement);

    return true;
  }
}
