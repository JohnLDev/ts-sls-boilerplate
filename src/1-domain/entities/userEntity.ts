import { v4 } from 'uuid'
import { IInputCreateUserDTO } from '@business/dtos/useCases/user/CreateUserDTO'
import { Either, right } from '../../shared/errors/either'
import { IError } from '../../shared/errors/iError'
import { AbstractEntity } from './abstractEntity'

export interface IUserEntity {
  id: string

  name: string

  email: string

  password: string

  created_at: Date

  updated_at: Date
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(data: IInputCreateUserDTO): Either<IError, UserEntity> {
    const entity = new UserEntity({
      ...data,
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
    })
    return right(entity)
  }
}
