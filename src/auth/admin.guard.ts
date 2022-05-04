import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user.email) throw new UnauthorizedException();

    const user = await this.usersService.findByEmail(request.user.email);

    if (user.role === 'ADMIN') return true;

    throw new UnauthorizedException();
  }
}
