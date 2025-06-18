import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateClientDtoInput } from './dto/create-client.dto'
import { Prisma } from '@prisma/client'
import { AuthenticatedRequest } from '@dental-pro/utils'

@Injectable()
export class CreateClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(
    req: AuthenticatedRequest,
    createClientDto: CreateClientDtoInput
  ): Promise<
    Prisma.ClientGetPayload<{
      select: {
        id: true
        firstName: true
        lastName: true
      }
    }>
  > {
    const {
      email,
      firstName,
      lastName,
      address,
      allergies,
      bloodGroup,
      city,
      country,
      dob,
      gender,
      phone,
      postalCode,
    } = createClientDto

    const createdClient = await this.prisma.client.create({
      data: {
        email,
        firstName,
        lastName,
        address,
        allergies,
        bloodGroup,
        city,
        country,
        dob,
        gender,
        phone,
        postalCode,
        company_id: req.user.company_id,
        created_by: req.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    })
    return createdClient
  }
}
