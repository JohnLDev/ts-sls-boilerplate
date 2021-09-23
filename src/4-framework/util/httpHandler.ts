import { httpResponse } from '@framework/util/httpResponse'
import { Either } from '@shared/errors/either'
import { IError } from '@shared/errors/iError'
import { APIGatewayProxyResult } from 'aws-lambda'

export const httpHandler = async (
  handler: () => Promise<Either<IError, unknown>>,
): Promise<APIGatewayProxyResult> => {
  try {
    const response = await handler()
    if (response.isLeft()) {
      return httpResponse.badRequest(response.value)
    }
    return httpResponse.ok(response.value)
  } catch (error) {
    if (error && error.shortMessage === 'validationError') {
      return httpResponse.badRequest(error)
    }
    console.error(error)
    return httpResponse.internalServerError('')
  }
}
