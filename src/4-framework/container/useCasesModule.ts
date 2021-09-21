import { ContainerModule, interfaces } from 'inversify'
import { CreateUserCase } from '@business/useCases/user/CreateUserCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserCase).to(CreateUserCase)
})
