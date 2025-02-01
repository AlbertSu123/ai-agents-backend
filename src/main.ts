import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { IpInterceptor } from './common/interceptors/ip.interceptor';
import cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.useWebSocketAdapter(new WsAdapter(app));

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new IpInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Origin',
    origin: [
      /^https:\/\/(?:[a-z0-9\-]+(?:\.[a-z0-9]+)*\.)?sweep\.gg$/,
      /sweep-gg.vercel.app$/,
      /^http:\/\/localhost:([0-9]+)$/,
      'https://hoppscotch.io',
      '*',
    ],
  });

  await app.listen(config.get('port'));
  console.log(`Application is running: ${await app.getUrl()}`);
}

bootstrap();
