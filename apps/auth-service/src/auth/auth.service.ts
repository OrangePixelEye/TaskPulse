import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const existingUser = await this.authRepository.findOneBy({
      email: createAuthDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      saltRounds,
    );

    const newUser = this.authRepository.create({
      email: createAuthDto.email,
      passwordHash: hashedPassword, 
    });

    return this.authRepository.save(newUser);
  }
  findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  async findOne(id: number): Promise<Auth> {
    const user = await this.authRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const user = await this.findOne(id); 

    if (updateAuthDto.email) {
      const existingUser = await this.authRepository.findOneBy({
        email: updateAuthDto.email,
      });
      //Prevent update if new email is already used by another user.
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    if (updateAuthDto.password) {
      const saltRounds = process.env.SALT_ROUNDS;
      user.passwordHash = await bcrypt.hash(updateAuthDto.password, saltRounds);
    }

    Object.assign(user, updateAuthDto);
    return this.authRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.authRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  findByEmail(email: string): Promise<Auth | undefined> {
    return this.authRepository.findOneBy({ email });
  }
}
