import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getUserProfile(email: string): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async create(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    user.password = await bcrypt.hash(user.password, 10);
    const { password: _, ...createdUser } = await this.prisma.user.create({
      data: {
        ...user,
        role: 'USER',
      },
    });
    return createdUser;
  }
}
