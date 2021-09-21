import { ContainerModule, interfaces } from 'inversify'
// import {
//   IUserService,
//   IUserServiceToken,
// } from '@business/services/IUserService'
// import { UserService } from '@framework/services/UserService'

export const ServiceModule = new ContainerModule((bind: interfaces.Bind) => {
  // bind<IUserService>(IUserServiceToken).to(UserService)
})
