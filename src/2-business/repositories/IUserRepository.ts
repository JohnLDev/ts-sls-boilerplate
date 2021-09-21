import { IInputCreateUserDTO } from '@business/dtos/useCases/user/CreateUserDTO'
import { IUserEntity } from '@domain/entities/userEntity'

export const IUserRepositoryToken = Symbol.for('IUserRepository')
export interface IUserRepository {
  // findAll(): Promise<IUserEntity[]>
  // findOne(id: string): Promise<IUserEntity>
  create(data: IInputCreateUserDTO): Promise<IUserEntity>
  // update(data: IInputCreateUserDTO): Promise<IUserEntity>
  // delete(id: string): Promise<boolean>
}
