import IBrowserConfigurationSchema from './IBrowserConfigurationSchema';
import ICacheConfigurationSchema from './ICacheConfigurationSchema';
import ILoggerConfigurationSchema from './ILoggerConfigurationSchema';
import IRobotInstagramConfigurationSchema from './IRobotInstagramConfigurationSchema';

type DefaultSchema = IRobotInstagramConfigurationSchema &
  IBrowserConfigurationSchema &
  ICacheConfigurationSchema &
  ILoggerConfigurationSchema;

export default DefaultSchema;
