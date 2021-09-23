import {
  IInputCreateUserDTO,
  OutputCreateUserDTO,
} from '@business/dtos/useCases/user/CreateUserDTO'
import { hashSync } from 'bcrypt'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/IUserRepository'
import { IUseCase } from '@business/useCases/IUseCase'
import { left, right } from '@shared/errors/either'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateUserCase
  implements IUseCase<IInputCreateUserDTO, OutputCreateUserDTO>
{
  private userRepository: IUserRepository
  constructor(@inject(IUserRepositoryToken) userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async exec(data: IInputCreateUserDTO): Promise<OutputCreateUserDTO> {
    try {
      data.password = hashSync(data.password, 10)
      const user = await this.userRepository.create(data)

      return right(user)
    } catch (error) {
      console.log(error, 'USE CASE')
      const requestError =
        error?.response?.data?.errors || error?.response?.data || error
      console.log(requestError)
      return left(requestError)
    }
  }
}
