import 'dotenv/config';
import 'reflect-metadata';

import '@shared/container';

import { container } from 'tsyringe';
import { usage, Argv } from 'yargs';

import cacheConfig from '@config/cache';
import instagramConfig from '@config/instagram';

import Launcher from '@shared/puppeteer/launcher';

interface IArgv extends Argv {
  username: string;
  password: string;
  cache_key: string;
  headless: boolean;
  verbose: boolean;
}

usage('Usage: $0 <cmd> [options]')
  .command(
    'run',
    'Run instagram robot',
    yargs => {},
    (argv: IArgv) => {
      const launcher = container.resolve(Launcher);

      const { username, password, cache_key, headless, verbose } = argv;

      if (username && password) {
        instagramConfig.username = username;
        instagramConfig.password = password;
      }

      if (cache_key) {
        cacheConfig.key = cache_key;
      }

      launcher
        .launch({ username, password, headless, verbose })
        .catch(err => {
          console.log('Occurred an unexpected error:');
          console.log(err);
        })
        .finally(() => {
          // process.exit();
        });
    },
  )
  .option('username', {
    type: 'string',
    description: 'Instagram account username',
    demandOption: true,
  })
  .option('password', {
    type: 'string',
    description: 'Instagram account password',
    demandOption: true,
  })
  .option('cache_key', {
    type: 'string',
    description: 'Set the custom cache key',
  })
  .option('headless', {
    type: 'boolean',
    description: 'Run with headless browser',
    default: false,
  })
  .option('verbose', {
    type: 'boolean',
    description: 'Run with verbose logging',
    default: false,
  })
  .help()
  .strict().argv;
