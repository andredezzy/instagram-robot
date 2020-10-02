import { container } from 'tsyringe';

import IProfilePage from '@modules/profile/pages/IProfilePage';
import FollowUserService from '@modules/profile/services/FollowUserService';
import NavigateToProfileService from '@modules/profile/services/NavigateToProfileService';

class ProfilePage implements IProfilePage {
  public async navigateTo(url: string): Promise<void> {
    const navigateToProfile = container.resolve(NavigateToProfileService);

    await navigateToProfile.execute({ profile_url: url });
  }

  public async follow(): Promise<void> {
    const followUser = container.resolve(FollowUserService);

    await followUser.execute();
  }
}

export default ProfilePage;
