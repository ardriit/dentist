import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { AuthGuard } from '../auth/auth.guard'
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto)
  }

  // @Get()
  // findAll() {
  //   return this.companyService.findAll();
  // }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Body() input: { id: number }) {
    return this.companyService.findFirstCompany(input.id)
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyService.update(id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(id);
  // }
}
