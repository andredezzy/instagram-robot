import IRobotInstagramPage from '@shared/puppeteer/pages/IRobotInstagramPage';

import ISignInCredentialsDTO from '../dtos/ISignInCredentialsDTO';

export default interface ISignInPage extends IRobotInstagramPage {
  signIn(credentials: ISignInCredentialsDTO): Promise<boolean>;
}
