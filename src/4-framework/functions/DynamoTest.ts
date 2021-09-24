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
import AWS from 'aws-sdk'

import { httpHandler } from '@framework/util/httpHandler'
import { right } from '@shared/errors/either'
async function setupDynamoDB() {
  if (!process.env.IS_OFFLINE) {
    console.log('DynamoDB is  not offline')
    return new AWS.DynamoDB.DocumentClient()
  }
  const host = process.env.LOCALSTACK_HOST || 'localhost'
  const port = process.env.LOCALSTACK_PORT || '4566'
  console.log('running locally', host, port)

  return new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
    endpoint: new AWS.Endpoint(`http://${host}:${port}`),
  })
}

const main = async (
  event: APIGatewayProxyEvent,
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
      // await dynamooseModel.create({ id: 'asdjsaodji2' })
      const scan = await dynamooseModel.scan().all().exec()
      console.log(scan, 'scan')
      // console.log('starting')
      // const dynamoDB = await setupDynamoDB()
      // console.log('after connection')
      // const heroes = await dynamoDB
      //   .scan({
      //     TableName: 'settings',
      //   })
      //   .promise()
      // console.log('after search')

      // console.log(heroes)
      return right(true)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
}

export const handler = middyfy(main)
