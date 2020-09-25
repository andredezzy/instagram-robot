import 'dotenv/config';
import 'reflect-metadata';

import '@shared/container';

import { container } from 'tsyringe';
import { usage, Argv } from 'yargs';

import IConfigurationProvider from '@shared/container/providers/ConfigurationProvider/models/IConfigurationProvider';
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
    _yargs => {
      // add positional options
    },
    async (argv: IArgv) => {
      const configurationProvider = container.resolve<IConfigurationProvider>(
        'ConfigurationProvider',
      );

      await configurationProvider.save(argv);

      const launcher = container.resolve(Launcher);

      launcher
        .launch()
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
    default: '6772280a5a36a08c5dffcc0feb552338',
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
