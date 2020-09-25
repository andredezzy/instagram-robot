import { container } from 'tsyringe';

import MemoryConfigurationProvider from './implementations/MemoryConfigurationProvider';
import IConfigurationProvider from './models/IConfigurationProvider';

const providers = {
  memory: MemoryConfigurationProvider,
};

container.registerSingleton<IConfigurationProvider>(
  'ConfigurationProvider',
  providers.memory,
);
