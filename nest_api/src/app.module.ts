import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configs from './configs';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${configs.mongo.host}:${configs.mongo.port}/${configs.mongo.database}`,
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
