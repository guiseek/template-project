import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @Post('login')
  login(@Body() data) {
    return this.authService.login(data)
  }
}
