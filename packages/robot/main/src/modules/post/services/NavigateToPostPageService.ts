import { injectable, inject } from 'tsyringe';

import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

interface IRequest {
  post_url: string;
}

@injectable()
export default class NavigateToSignInPageService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute({ post_url }: IRequest): Promise<void> {
    await this.page.goTo(post_url);

    await this.page.driver.waitForSelector(
      instagramConfig.pages.post.selectors.photo_img,
    );
  }
}
