import { IInputCreateUserDTO } from '@business/dtos/useCases/user/CreateUserDTO'
import { IUserRepository } from '@business/repositories/IUserRepository'
import { IUserEntity, UserEntity } from '@domain/entities/userEntity'
import { UserModel } from '@framework/models/UserModel'
import { inject, injectable } from 'inversify'
import { v4 } from 'uuid'

@injectable()
// @EntityRepository(UserModel)
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async create(userEntity: IInputCreateUserDTO): Promise<IUserEntity> {
    const user = this.userModel.create({ id: v4(), ...userEntity })

    return user
  }
}
