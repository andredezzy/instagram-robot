import '@shared/container';
import { container } from 'tsyringe';

import Launcher from '@shared/launcher';

const launcher = container.resolve(Launcher);

launcher.launch();
