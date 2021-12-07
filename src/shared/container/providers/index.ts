import { container } from 'tsyringe';
import { IDateProvider } from '@shared/container/providers/DateProviders/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProviders/implementations/DayJsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayJsProvider',
  DayJsDateProvider
);