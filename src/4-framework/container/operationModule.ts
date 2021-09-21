import { ContainerModule, interfaces } from 'inversify'
import { CreateUserOperation } from '@controller/operations/user/CreateUserOperation'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperation).to(CreateUserOperation)
})
