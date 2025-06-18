export interface LoginUser {
  id: number
  email: string
  firstName: string
  lastName: string
  Company: {
    id: number
    name: string
  }
}

export interface Login {
  message: string
  success: boolean
  user: LoginUser
}

export interface JwtUser {
  email: string
  id: number
  iat: number
  company_id: number
  exp: number
}
