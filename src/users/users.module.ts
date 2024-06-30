import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { Reclamation } from 'src/reclamations/reclamation.entity'; 

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
    TypeOrmModule.forFeature([User, Reclamation]), 
    JwtModule.register({
      secret: 'secret', // clé secrète
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
