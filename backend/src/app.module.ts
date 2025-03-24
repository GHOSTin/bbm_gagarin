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
import { ProfTestsModule } from './prof-tests/prof-tests.module';
import { ChecklistsModule } from './checklists/checklists.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';

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
    TestsModule,
    ProfTestsModule,
    ChecklistsModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      },
      defaults: {
        from:'"Дневник профпроб" <ano.irdo@yandex.ru>',
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
