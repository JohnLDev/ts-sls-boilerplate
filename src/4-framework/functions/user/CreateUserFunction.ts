import 'source-map-support/register'
import 'reflect-metadata'
import '@framework/container/inversify.config'
import { middyfy } from '@framework/utility/lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { container } from '@shared/container/container'
import { CreateUserOperation } from '@controller/operations/user/CreateUserOperation'
import { InputCreateUser } from '@controller/serializers/user/CreateUserSerializer'
import { httpHandler } from '@framework/utility/httpHandler'

const main = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  return httpHandler(async () => {
    const operator = container.get(CreateUserOperation)

    const input = new InputCreateUser(
      event.body as unknown as Record<string, unknown>,
    )
    return operator.exec(input)
  })
}

export const handler = middyfy(main)
