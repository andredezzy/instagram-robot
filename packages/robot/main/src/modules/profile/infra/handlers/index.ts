import { inject, injectable } from 'tsyringe';

import { IHandler } from '@robot/shared/modules/browser/models/IBrowser';

import IConfigurationProvider from '@shared/container/providers/ConfigurationProvider/models/IConfigurationProvider';

import PostPage from '@modules/post/infra/puppeteer/pages/PostPage';

@injectable()
class ProfileHandler implements IHandler {
  constructor(
    @inject('ConfigurationProvider')
    private configurationProvider: IConfigurationProvider,
  ) {}

  public async handle(): Promise<void> {
    const postPage = new PostPage();

    const { post_url, message } = await this.configurationProvider.pick([
      'post_url',
      'message',
    ]);

    await postPage.navigateTo(post_url);

    await postPage.comment(message);
  }
}

export default ProfileHandler;
