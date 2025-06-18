import type { Request } from 'express'
import type { JwtUser } from './index'

export interface AuthenticatedRequest extends Request {
  user: JwtUser
}
