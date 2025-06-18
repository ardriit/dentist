import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma.mdule'
import { CompanyModule } from './company/company.module'
import { ClientModule } from './clients/client.module'

@Module({
  imports: [AuthModule, PrismaModule, CompanyModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
