import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  const config = new DocumentBuilder()
  .setTitle('Luận văn swagger API')
  .setDescription('The SnapGrams API description')
  .setVersion('1.0') .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'JWT-auth', 
  )
  .build();
  const app = await NestFactory.create(AppModule, appOptions);
  //global prefix
  app.setGlobalPrefix('api/v1');
  const document = SwaggerModule.createDocument(app, config,{
    include : [AuthModule,UserModule]
  });
  SwaggerModule.setup('api', app, document);
  app.enableCors()
  await app.listen(5000);
}
bootstrap();
