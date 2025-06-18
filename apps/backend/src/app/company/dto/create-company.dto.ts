import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateCompanyDto extends CreateUserDto {
  readonly name: string;
}
