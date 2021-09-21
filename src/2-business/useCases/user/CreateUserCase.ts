import {
  IInputCreateUserDTO,
  OutputCreateUserDTO,
} from '@business/dtos/useCases/user/CreateUserDTO'
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
  private userService: IUserRepository
  constructor(@inject(IUserRepositoryToken) userService: IUserRepository) {
    this.userService = userService
  }

  async exec(data: IInputCreateUserDTO): Promise<OutputCreateUserDTO> {
    try {
      const user = await this.userService.create(data)

      return right(user)
    } catch (error) {
      const requestError =
        error?.response?.data?.errors || error?.response?.data || error
      console.log(requestError)
      return left(requestError)
    }
  }
}
