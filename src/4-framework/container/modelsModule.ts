import { ContainerModule, interfaces } from 'inversify'
import { UserModel } from '@framework/models/UserModel'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
})
