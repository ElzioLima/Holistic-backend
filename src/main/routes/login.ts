import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeUserLoginController, makeUserSignUpController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', adapt(makeUserLoginController()))
  router.post('/signup', adapt(makeUserSignUpController()))
}
