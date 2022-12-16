import { TokenGenerator, HashComparer, Hasher } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository, CreateUser } from '@/domain/contracts/repos'
import { AccessToken, AuthenticationError, NotCreatedUser, User } from '@/domain/entities'

type Setup = (
  userAccountRepo: LoadAccountByEmailRepository & UpdateAccessTokenRepository & CreateUser,
  tokenGenerator: TokenGenerator,
  hasher: HashComparer & Hasher
) => UserAuthentication
type Input = { email: string, password: string }
type Output = { accessToken: string, email: string } | AuthenticationError | NotCreatedUser
export type UserAuthentication = (input: Input) => Promise<Output>

export const setupUserAuthentication: Setup = (userAccountRepo, tokenGenerator, hasher) => async (input) => {
  const account = await userAccountRepo.loadByEmail({ email: input.email })
  if (account != null) {
    const isValid = await hasher.compare({ plaintext: input.password, digest: account.password })
    if (isValid) {
      const accessToken = await tokenGenerator.generate({ key: account.id.toString(), ...AccessToken })
      await userAccountRepo.updateAccessToken({ id: account.id, token: accessToken })
      return new User({
        accessToken,
        email: account.email
      })
    }
  }
  return new AuthenticationError()
}
