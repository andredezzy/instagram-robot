import { injectable, inject } from 'tsyringe';

import AppError from '@robot/shared/errors/AppError';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

@injectable()
export default class CheckIsFollowingUserService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute(): Promise<boolean> {
    const [
      findProfileAvatarImgElement,
    ] = await this.page.findElementsBySelector(
      instagramConfig.pages.profile.selectors.avatar_img,
    );

    if (!findProfileAvatarImgElement) {
      throw new AppError('You should be on some profile page.');
    }

    const [findFollowingButtonElement] = await this.page.findElementsByText(
      'div > span > span > button > div > span[aria-label="Following"]',
    );

    return !!findFollowingButtonElement;
  }
}
