import IRobotInstagramPage from '@shared/puppeteer/pages/IRobotInstagramPage';

export default interface IPostPage
  extends Omit<IRobotInstagramPage, 'navigateTo'> {
  navigateTo(url: string): Promise<void>;
  comment(message: string): Promise<void>;
}
