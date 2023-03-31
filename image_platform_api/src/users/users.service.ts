import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.getByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException(
        'User with such "Username" is registered in the system',
      );
    }
    const createdUser = this.usersRepository.create(createUserDto);
    return createdUser;
  }

  async findById(id: string) {
    return this.usersRepository.getById(id);
  }

  async findByUsername(username: string) {
    return this.usersRepository.getByUsername(username);
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(updateUserDto);
  }
}
