import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'
import { AuthenticatedRequest } from '@dental-pro/utils'

@Injectable()
export class GetClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(req: AuthenticatedRequest): Promise<
    Prisma.ClientGetPayload<{
      select: {
        id: true
        firstName: true
        lastName: true
        email: true
        phone: true
      }
    }>[]
  > {
    const clients = await this.prisma.client.findMany({
      where: {
        company_id: req.user.company_id, // fetch only clients from the same company
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    })

    return clients
  }
}
