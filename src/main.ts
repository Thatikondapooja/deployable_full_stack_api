import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",  // change this to your FRONTEND URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  const config = new DocumentBuilder()
    .setTitle('Project Manager API')
    .setDescription('API documentation for Project App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
  console.log("Backend running on http://localhost:5000");
}
bootstrap();
