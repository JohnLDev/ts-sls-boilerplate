import { container } from '@shared/container/container'
import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operationModule'
import { UseCasesModule } from './useCasesModule'
import { ServiceModule } from '@framework/container/serviceModule'
// import { createConnection } from 'typeorm'
// import { UserModel } from '@framework/models/UserModel'
import { ModelsModule } from '@framework/container/modelsModule'
import { sequelize } from '@framework/database'

container.bind('sequelize').toConstantValue(sequelize)
container.load(ModelsModule)
container.load(RepositoryModule)
container.load(UseCasesModule)
container.load(OperatorModule)
container.load(ServiceModule)
