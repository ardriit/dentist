import { Module } from '@nestjs/common'
import { ClientController } from './client.controller'
import { AuthModule } from '../auth/auth.module'
import { CreateClientService } from './createClient.service'
import { JwtService } from '@nestjs/jwt'
import { GetClientsService } from './getClients.service'

@Module({
  imports: [AuthModule],
  controllers: [ClientController],
  providers: [CreateClientService, GetClientsService, JwtService],
})
export class ClientModule {}
