import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    getUserWithSelectedFields(id: number, selectedFields: any[]) {
        throw new Error('Method not implemented.');
    }
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) 
  {}
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  //async getUserByCin(cin: number): Promise<User | undefined> {
  //  return await this.usersRepository.findOne({ where: { cin } });
  //}
  
async getUser(_id: number): Promise<User[]> {
  return await this.usersRepository.find({
      select: [ "nom", "prenom", "email", "tel"],
      where: [{ "id": _id }]
  });
}


  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {
    await this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
