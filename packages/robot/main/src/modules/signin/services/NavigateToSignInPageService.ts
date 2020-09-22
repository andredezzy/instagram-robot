import { injectable, inject } from 'tsyringe';

import Page from '@scraper/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

@injectable()
export default class NavigateToSignInPageService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute(): Promise<void> {
    await this.page.goTo(instagramConfig.pages.signin.url);
  }
}
