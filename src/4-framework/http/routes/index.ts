import { userRouter } from '@framework/http/routes/user.routes'
import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  console.log(process.env)
  return res.status(200).json({
    message: 'Hello from root!',
  })
})
router.use('/user', userRouter)
router.get('/hello', (_req, res) =>
  res.status(200).json({
    message: 'Hello from path!',
  }),
)

router.use((_req, res) =>
  res.status(404).json({
    error: 'Not Found',
  }),
)
export { router }
