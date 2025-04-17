import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utilis/catchAsync'

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body, req.cookies)

    next()
  })
}

export default validateRequest