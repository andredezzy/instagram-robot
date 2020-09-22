type WaitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export default interface IGoToOptionsDTO {
  waitUntil: WaitUntil | WaitUntil[];
}
