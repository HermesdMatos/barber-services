import { IsEmail, IsNotEmpty } from 'class-validator';
export default class CreateExpertsDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'O email é inválido' })
  email: string;

  phone: string;
}