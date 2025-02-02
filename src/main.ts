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
    origin: '*', // Allow all origins
    methods: '*', // Allow all methods
    allowedHeaders: '*', // Allow all headers
    credentials: false, // Must be false when using origin: '*'
  });

  await app.listen(config.get('port'));
  console.log(`Application is running: ${await app.getUrl()}`);
}

bootstrap();
