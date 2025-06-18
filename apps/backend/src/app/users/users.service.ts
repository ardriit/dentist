import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { validateEmail } from '@dental-pro/utils'
import { Prisma } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<Prisma.UserGetPayload<{ select: { id: true; email: true } }>> {
    const { email, password, firstName, lastName, companyId } = createUserDto

    if (!validateEmail(email)) {
      throw new Error('Invalid email')
    }
    const hashPassword = (password: string) => {
      const saltRounds = 10
      return bcrypt.hash(password, saltRounds)
    }
    const hashedPassword = await hashPassword(password)

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        company_id: companyId,
      },
      select: {
        id: true,
        email: true,
      },
    })
  }

  async findOne(
    email: string
  ): Promise<Prisma.UserGetPayload<{ include: { Company: true } }> | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        Company: true,
      },
    })
  }

  async hashPassword(password: string): Promise<string> {
    return password
  }
}
