import { IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/errors/either'
import { IError } from '@shared/errors/iError'

export interface IInputCreateUserDTO {
  name: string
  email: string
  password: string
}

export type OutputCreateUserDTO = Either<IError, IUserEntity>
