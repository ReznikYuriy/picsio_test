import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { hashSync } from 'bcryptjs';
import { User } from '../schemas/user.schema';
import configs from 'src/configs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly userRepo: UsersRepository) {}

  async onModuleInit() {
    const users = await this.findAll();
    if (users?.length === 0) {
      await this.create({
        name: configs.default_user.name,
        email: configs.default_user.email,
        password: configs.default_user.password,
      });
      Logger.log('Default user created');
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    const data = {
      ...dto,
      password: hashSync(dto.password),
    };
    return this.userRepo.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepo.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneByEmail(email);
  }

  async remove(id: string): Promise<User | null> {
    return this.userRepo.remove(id);
  }
}
