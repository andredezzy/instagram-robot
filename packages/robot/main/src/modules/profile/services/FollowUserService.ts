import { injectable, inject } from 'tsyringe';

import AppError from '@robot/shared/errors/AppError';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

import CheckIsFollowingUserService from '@modules/profile/services/CheckIsFollowingUserService';

@injectable()
export default class FollowUserService {
  private checkIsFollowingUser: CheckIsFollowingUserService;

  constructor(
    @inject('Page')
    private page: Page,
  ) {
    this.checkIsFollowingUser = new CheckIsFollowingUserService(page);
  }

  public async execute(): Promise<void> {
    const [
      findProfileAvatarImgElement,
    ] = await this.page.findElementsBySelector(
      instagramConfig.pages.profile.selectors.avatar_img,
    );

    if (!findProfileAvatarImgElement) {
      throw new AppError('You should be on some profile page.');
    }

    const isFollowingUser = this.checkIsFollowingUser.execute();

    if (isFollowingUser) {
      return;
    }

    const [findFollowButtonElement] = await this.page.findElementsBySelector(
      'header > section > div > div > div > div > div > span > span > button',
    );

    if (!findFollowButtonElement) {
      throw new AppError('It was not able to find follow button element.');
    }

    await findFollowButtonElement.click();
  }
}
