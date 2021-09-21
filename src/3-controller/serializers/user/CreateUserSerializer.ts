import {
  IInputCreateUserDTO,
  OutputCreateUserDTO,
} from '@business/dtos/useCases/user/CreateUserDTO'
import { Validatable } from '@controller/serializers/abstractValidatable'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class InputCreateUser extends Validatable<IInputCreateUserDTO> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputCreateUser = OutputCreateUserDTO
