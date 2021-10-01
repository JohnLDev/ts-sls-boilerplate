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
import { SQS, SNS, Endpoint } from 'aws-sdk'

const getSdks = () => {
  interface IConfig {
    endpoint?: Endpoint
    s3ForcePathStyle: boolean
  }

  const host = process.env.LOCALSTACK_HOST || 'localhost'
  const port = process.env.LOCALSTACK_PORT || '4566'
  const isLocal = process.env.IS_OFFLINE
  const endpoint = new Endpoint(`http://${host}:${port}`)

  const config: IConfig = {
    endpoint: endpoint,
    s3ForcePathStyle: true,
  }
  if (!isLocal) delete config?.endpoint
  console.log(config)
  return {
    sqs: new SQS(config),
    sns: new SNS(config),
  }
}

const main = async (
  _event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('getting sdks')
  const { sqs, sns } = getSdks()
  async function GetQueueUrl(): Promise<string> {
    const { QueueUrl } = await sqs
      .getQueueUrl({
        QueueName: 'FGTS',
      })
      .promise()
    return QueueUrl as string
  }

  console.log('getting queue url')

  const QueueUrl = await GetQueueUrl()
  console.log(
    await sqs
      .sendMessage({ MessageBody: 'oii', QueueUrl }, err => console.log(err))
      .promise(),
  )
  console.log('sending message')
  console.log(await sqs.listQueues().promise())

  await sns
    .publish(
      {
        Message: 'TEST',
        TopicArn: 'arn:aws:sns:us-east-1:851996801877:FGTSProposalConfirmed',
      },
      err => console.log(err, 'erro'),
    )
    .promise()

  // TopicArn: 'arn:aws:sns:us-east-1:000000000000:FGTSProposalConfirmed',
  console.log('message sended')

  return httpHandler(async () => {
    try {
      return right(QueueUrl)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
}

export const handler = middyfy(main)
