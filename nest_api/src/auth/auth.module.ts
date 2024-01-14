import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import configs from 'src/configs';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: configs.jwt.secret,
      signOptions: { expiresIn: configs.jwt.expiresIn },
    }),
    PassportModule.register({
      defaultStrategy: 'local',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
