import { injectable, inject } from 'tsyringe';

import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

interface IRequest {
  profile_url: string;
}

@injectable()
export default class NavigateToSignInPageService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute({ profile_url }: IRequest): Promise<void> {
    await this.page.goTo(profile_url);

    await this.page.driver.waitForSelector(
      instagramConfig.pages.profile.selectors.avatar_img,
    );
  }
}
