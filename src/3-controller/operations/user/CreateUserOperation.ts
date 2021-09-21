import { CreateUserCase } from '@business/useCases/user/CreateUserCase'
import { AbstractOperator } from '@controller/operations/abstractOperator'
import {
  InputCreateUser,
  OutputCreateUser,
} from '@controller/serializers/user/CreateUserSerializer'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateUserOperation extends AbstractOperator<
  InputCreateUser,
  OutputCreateUser
> {
  public constructor(
    @inject(CreateUserCase)
    private createUserCase: CreateUserCase,
  ) {
    super()
  }

  async run(input: InputCreateUser): Promise<OutputCreateUser> {
    const result = await this.createUserCase.exec(input)

    return result
  }
}
