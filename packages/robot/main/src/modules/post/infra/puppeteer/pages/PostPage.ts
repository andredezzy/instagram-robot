import { container } from 'tsyringe';

import IPostPage from '@modules/post/pages/IPostPage';
import CreateCommentService from '@modules/post/services/CreateCommentService';
import NavigateToPostPageService from '@modules/post/services/NavigateToPostPageService';

class PostPage implements IPostPage {
  public async navigateTo(url: string): Promise<void> {
    const navigateToPostPage = container.resolve(NavigateToPostPageService);

    await navigateToPostPage.execute({ post_url: url });
  }

  public async comment(message: string): Promise<void> {
    const createComment = container.resolve(CreateCommentService);

    await createComment.execute({ message });
  }
}

export default PostPage;
