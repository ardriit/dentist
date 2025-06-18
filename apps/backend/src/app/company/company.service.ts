import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateCompanyDto } from './dto/create-company.dto.ts';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService, private authUser: AuthService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
      },
    });
    const user = await this.authUser.register({
      email: createCompanyDto.email,
      password: createCompanyDto.password,
      firstName: createCompanyDto.firstName,
      lastName: createCompanyDto.lastName,
      companyId: company.id,
    });
    return { ...company, user };
  }

  async findFirstCompany(id: number) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company not found`);
    }
    return company;
  }
}
