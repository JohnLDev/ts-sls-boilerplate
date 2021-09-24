import 'source-map-support/register'
import 'reflect-metadata'
import '@framework/container/inversify.config'
import dynamoose from 'dynamoose'
import { middyfy } from '@framework/util/lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { httpHandler } from '@framework/util/httpHandler'
import { right } from '@shared/errors/either'
import { v4 } from 'uuid'

const main = async (
  _event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false

  return httpHandler(async () => {
    try {
      const dynamooseModel = dynamoose.model(
        'settings',
        new dynamoose.Schema({
          id: String,
        }),
      )
      await dynamooseModel.create({ id: v4() })
      const scan = await dynamooseModel.scan().all().exec()
      console.log(scan, 'scan')
      return right(true)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
}

export const handler = middyfy(main)
