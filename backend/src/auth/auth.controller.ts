import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.authService.register(registerDto);
      return { message: 'Usuario registrado exitosamente', user };
    } catch (error) {
      return { message: 'Error al registrar el usuario', error: error.message };
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }
      return this.authService.login(user);
    } catch (error) {
      return { message: 'Error al iniciar sesión', error: error.message };
    }
  }
}