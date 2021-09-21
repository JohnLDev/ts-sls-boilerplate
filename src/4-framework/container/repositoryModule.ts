import { ContainerModule, interfaces } from 'inversify'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/IUserRepository'
import { UserRepository } from '@framework/repositories/UserRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
