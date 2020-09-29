import { injectable, inject } from 'tsyringe';

import AppError from '@robot/shared/errors/AppError';
import Page from '@robot/shared/modules/browser/infra/puppeteer/models/Page';

import instagramConfig from '@config/instagram';

interface IRequest {
  message: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('Page')
    private page: Page,
  ) {}

  public async execute({ message }: IRequest): Promise<void> {
    const [findPostPhotoImgElement] = await this.page.findElementsBySelector(
      instagramConfig.pages.post.selectors.photo_img,
    );

    if (!findPostPhotoImgElement) {
      throw new AppError('You should be on some post page.');
    }

    const [
      findPostCommentTextareaElement,
    ] = await this.page.findElementsBySelector(
      'section > div > form > textarea',
    );

    if (!findPostCommentTextareaElement) {
      throw new AppError(
        'It was not able to find post comment textarea element.',
      );
    }

    await this.page.typeToElement(findPostCommentTextareaElement, message);

    const [
      findPublishCommentButtonElement,
    ] = await this.page.findElementsBySelector('section > div > form > button');

    if (!findPublishCommentButtonElement) {
      throw new AppError(
        'It was not able to find publish comment button element.',
      );
    }

    await findPublishCommentButtonElement.click();
  }
}
