import { spawn } from 'child_process';

export default function _spawn(
  command: string,
  args?: string[],
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const child = spawn(command, args);

      child.stdout.setEncoding('utf8');
      child.stderr.setEncoding('utf8');

      child.stdout.on('data', data => {
        data = data.toString();
        console.log(`${data}`);
      });

      child.stderr.on('data', data => {
        data = data.toString();
        console.error(`${data}`);
      });

      child.on('close', () => {
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}
