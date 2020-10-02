import IRobotInstagramPage from '@shared/puppeteer/pages/IRobotInstagramPage';

export default interface IProfilePage
  extends Omit<IRobotInstagramPage, 'navigateTo'> {
  navigateTo(url: string): Promise<void>;
  follow(): Promise<void>;
}
