import 'reflect-metadata'
import '@framework/database/index'
import { config } from 'dotenv'
import { app } from '@framework/http/server'
import serverless from 'serverless-http'

config()

export const handler = serverless(app)
