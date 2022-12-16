import { makeUserSignUp } from '@/main/factories/domain/use-cases'
import { UserSignUpController, Controller } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/application/decorators'

export const makeUserSignUpController = (): Controller => {
  const controller = new UserSignUpController(makeUserSignUp())
  return makePgTransactionController(controller)
}
