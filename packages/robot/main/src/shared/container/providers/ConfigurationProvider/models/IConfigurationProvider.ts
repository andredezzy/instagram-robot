import DefaultSchema from '../schemas';

type Schema = DefaultSchema;

export default interface IConfigurationProvider {
  save(schema: Schema): Promise<void>;
  set<K extends keyof Schema>(key: K, value: Schema[K]): Promise<void>;
  get<K extends keyof Schema>(key: K): Promise<Schema[K]>;
  pick<K extends keyof Schema>(key: K[]): Promise<Pick<DefaultSchema, K>>;
}
