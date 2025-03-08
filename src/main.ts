import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando o CORS para permitir requisições do frontend (localhost:3001)
  app.enableCors({
    origin: 'http://localhost:3001', // URL do seu frontend - CORRIGIDO
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Adicionado OPTIONS para preflight
    allowedHeaders: 'Content-Type, Authorization, Origin, Accept', // Adicionado Origin e Accept
    credentials: true, // Importante para autenticação
  });

  // Pipes para validação de entrada
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000); // Backend escutando na porta 3000
}

bootstrap();