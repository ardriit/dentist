import { Injectable } from '@nestjs/common'
import { Response as ExpressResponse } from 'express'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { Login, type AuthenticatedRequest } from '@dental-pro/utils'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async signIn(
    email: string,
    pass: string,
    res: ExpressResponse
  ): Promise<ExpressResponse<Login>> {
    const user = await this.usersService.findOne(email)
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials', success: false })
    }

    const payload = {
      email: user.email,
      id: user.id,
      company_id: user.company_id,
    }
    const token = this.jwtService.sign(payload)

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.json({
      message: 'Logged in successfully',
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        Company: {
          name: user.Company.name,
          id: user.Company.id,
        },
      },
    })
  }

  //TODO with cookies
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.createUser(createUserDto)
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async me(
    req: AuthenticatedRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse<Login>> {
    const user = await this.usersService.findOne(req.user.email)

    return res.json({
      message: 'User found',
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        Company: {
          name: user.Company.name,
          id: user.Company.id,
        },
      },
    })
  }
}
