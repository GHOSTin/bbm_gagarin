import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './profiles/profiles.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfilesModule,
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
