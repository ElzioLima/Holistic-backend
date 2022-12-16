import { makeBcryptAdapter, makeJwtTokenHandler } from '@/main/factories/infra/gateways'
import { makePgUserAccountRepo } from '@/main/factories/infra/repos/postgres'
import { setupUserSignUp, UserSignUp } from '@/domain/use-cases'

export const makeUserSignUp = (): UserSignUp => {
  return setupUserSignUp(
    makePgUserAccountRepo(),
    makeJwtTokenHandler(),
    makeBcryptAdapter()
  )
}
