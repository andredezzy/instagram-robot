import { injectable, inject } from 'tsyringe';

import Page from '@scraper/shared/modules/browser/infra/puppeteer/models/Page';

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
    await this.page.type('form#loginForm input[name="username"]', username);
    await this.page.type('form#loginForm input[name="password"]', password);

    return true;
  }
}
