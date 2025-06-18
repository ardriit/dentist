import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { CreateClientService } from './createClient.service'
import { CreateClientDtoInput } from './dto/create-client.dto'
import { AuthenticatedRequest } from '@dental-pro/utils'
import { AuthGuard } from '../auth/auth.guard'
import { GetClientsService } from './getClients.service'

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientService: CreateClientService,
    private readonly getClientsService: GetClientsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createClientDto: CreateClientDtoInput
  ) {
    return this.createClientService.createClient(req, createClientDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getClients(@Request() req: AuthenticatedRequest) {
    return this.getClientsService.getClients(req)
  }
}
