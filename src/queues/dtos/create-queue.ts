import { IsEmail, IsNotEmpty } from 'class-validator';
export default class CreateQueueDto {
  @IsNotEmpty({ message: `The expertId is required` })
  expertId: string;
}