import 'reflect-metadata'
import '@framework/container/inversify.config'
import '@framework/database'
import { CreateUserOperation } from '@controller/operations/user/CreateUserOperation'
import { InputCreateUser } from '@controller/serializers/user/CreateUserSerializer'
import { container } from '@shared/container/container'
import { Router } from 'express'
// /user
const userRouter = Router()

userRouter.post('/', async (req, res) => {
  const operator = container.get(CreateUserOperation)
  const input = new InputCreateUser(JSON.parse(req.body))
  const user = await operator.exec(input)
  return res.json(user)
})

export { userRouter }
