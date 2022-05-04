import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/activate/:id')
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  activate(@Param('id') id: string): Promise<User> {
    return this.usersService.activate(Number(id));
  }
}
