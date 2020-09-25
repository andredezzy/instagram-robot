import _ from 'lodash';

import IConfigurationProvider from '../models/IConfigurationProvider';
import DefaultSchema from '../schemas';

class MemoryConfigurationProvider implements IConfigurationProvider {
  private configuration: DefaultSchema;

  constructor() {
    this.configuration = {} as DefaultSchema;
  }

  public async save(schema: DefaultSchema): Promise<void> {
    this.configuration = schema;
  }

  public async set<K extends keyof DefaultSchema>(
    key: K,
    value: DefaultSchema[K],
  ): Promise<void> {
    this.configuration[key] = value;
  }

  public async get<K extends keyof DefaultSchema>(
    key: K,
  ): Promise<DefaultSchema[K]> {
    return this.configuration[key];
  }

  public async pick<K extends keyof DefaultSchema>(
    key: K[],
  ): Promise<Pick<DefaultSchema, K>> {
    return _.pick(this.configuration, key);
  }
}

export default MemoryConfigurationProvider;
