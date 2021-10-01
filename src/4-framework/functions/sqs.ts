import 'source-map-support/register'
import 'reflect-metadata'
import '@framework/container/inversify.config'
import { middyfy } from '@framework/util/lambda'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { httpHandler } from '@framework/util/httpHandler'
import { right } from '@shared/errors/either'

const main = async (
  _event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log(_event, 'EVENTOOOO ***')

  return httpHandler(async () => {
    try {
      return right(true)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
}

export const handler = middyfy(main)
