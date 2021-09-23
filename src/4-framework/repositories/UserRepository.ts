import { IInputCreateUserDTO } from '@business/dtos/useCases/user/CreateUserDTO'
import { IUserRepository } from '@business/repositories/IUserRepository'
import { IUserEntity, UserEntity } from '@domain/entities/userEntity'
import { UserModel } from '@framework/models/UserModel'
import { inject, injectable } from 'inversify'

@injectable()
// @EntityRepository(UserModel)
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async create(userEntity: IInputCreateUserDTO): Promise<IUserEntity> {
    console.log('env', process.env)
    try {
      await this.userModel.sync()
      const userObject = UserEntity.create(userEntity).value as UserEntity

      const userOnDatabase = await this.userModel.create(userObject.props)

      return userOnDatabase
    } catch (error) {
      console.log(error, 'error')
      throw error
    }
  }
}
