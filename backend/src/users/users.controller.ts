import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const user = await this.usersService.findOne(req.user.sub);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const { password, ...result } = user;
    return result;
  }
}