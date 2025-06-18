import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common'
import { Response as ExpressResponse } from 'express'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthGuard } from './auth.guard'
import { AuthenticatedRequest } from '@dental-pro/utils'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: { email: string; password: string },
    @Res() res: ExpressResponse
  ) {
    return this.authService.signIn(signInDto.email, signInDto.password, res)
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req: AuthenticatedRequest, @Res() res: ExpressResponse) {
    return this.authService.me(req, res)
  }
}
