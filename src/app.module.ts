import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { Reclamation } from './reclamations/reclamation.entity';
import { UsersService } from './users/users.service';

import { ReclamationsModule } from './reclamations/reclamations.module';
import { MailerModule } from '@nestjs-modules/mailer'; // Importez le module MailerModule ici
import * as nodemailer from 'nodemailer'; // Importez nodemailer ici
import { EmailModule } from './emailModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gestion-reclamation',
      entities: [User, Reclamation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ReclamationsModule,
    EmailModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new nodemailer.getTestMessageUrl(), // Utilisez nodemailer directement ici
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
