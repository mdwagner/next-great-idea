import { cli } from 'tasksfile';
import { NestFactory } from '@nestjs/core';
import { Logger, INestApplicationContext } from '@nestjs/common';
import { AppModule } from './app.module';

async function runAppContext(cb: TaskCallback) {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'debug'],
  });
  const logger = new Logger();
  await cb(app, logger);
  await app.close();
}

const checkStatus = () =>
  runAppContext(async (app, logger) => {
    logger.debug('hello world');
  });

cli({
  fa: {
    checkStatus,
  },
});

type TaskCallback = (
  app: INestApplicationContext,
  logger: Logger,
) => Promise<void>;
