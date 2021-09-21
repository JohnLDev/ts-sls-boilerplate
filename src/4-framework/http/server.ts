import 'reflect-metadata'
import '@framework/database/index'
import express from 'express'
import { router } from '@framework/http/routes'
const app = express()

app.use(router)
export { app }
