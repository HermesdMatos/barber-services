import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
export default class CreateUsersDto {

  @IsNotEmpty({ message: `O campo de nome é obrigatório` })
  name: string;

  @IsNotEmpty({ message: `O campo de email é obrigatório` })
  @IsEmail({allow_display_name: true}, { message: `O email informado é inválido` })
  email: string;

  @IsNotEmpty({ message: `O campo de senha é obrigatório` })
  @IsStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: `A senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número e um caractere especial` })
  password: string;
}