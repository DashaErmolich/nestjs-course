import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JWTAuthGuard } from "./auth/jwt-auth.guard";

async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('NestJS Course')
  .setDescription('REST API')
  .setVersion('1.0.0')
  .addTag('nestjs')
  .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();