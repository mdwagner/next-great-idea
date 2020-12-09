import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { AppModule } from '../app.module';

export type TaskCallback = (app: INestApplicationContext) => Promise<void>;

export async function wrapAppContext(cb: TaskCallback) {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  await cb(app);
  await app.close();
}
