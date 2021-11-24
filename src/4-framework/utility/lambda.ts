/* eslint-disable @typescript-eslint/no-explicit-any */
import middy, { MiddyfiedHandler } from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import middyHttpCors from '@middy/http-cors'
import NotAwaitForLoops from '@middy/do-not-wait-for-empty-event-loop'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const middyfy = (handler: any): MiddyfiedHandler => {
  return middy(handler)
    .use(NotAwaitForLoops())
    .use(middyJsonBodyParser())
    .use(middyHttpCors())
}
