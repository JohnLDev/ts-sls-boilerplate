interface IReturnsHttp {
  statusCode: number
  body: string
}

interface IReturnsHttpNotFound {
  statusCode: number
  body: string | undefined
}

interface IReturnHttp {
  ok: (body) => IReturnsHttp
  created: (body) => IReturnsHttp
  badRequest: (body) => IReturnsHttp
  notFound: (body) => IReturnsHttpNotFound
  internalServerError: (body) => IReturnsHttp
}

export const httpResponse: IReturnHttp = {
  ok: body => {
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    }
  },

  created: body => {
    return {
      statusCode: 201,
      body: JSON.stringify(body),
    }
  },

  badRequest: body => {
    return {
      statusCode: 400,
      body: JSON.stringify(body),
    }
  },

  notFound: body => {
    return {
      statusCode: 404,
      body: body ? JSON.stringify(body) : undefined,
    }
  },

  internalServerError: body => {
    body = body || { error: 'Internal Server Error' }
    return {
      statusCode: 500,
      body: JSON.stringify(body),
    }
  },
}
