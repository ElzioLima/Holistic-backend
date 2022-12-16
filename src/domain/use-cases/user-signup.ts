import { TokenGenerator, HashComparer, Hasher } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository, CreateUser } from '@/domain/contracts/repos'
import { AccessToken, ExistingAccount, NotCreatedUser, User } from '@/domain/entities'

type Setup = (
  userAccountRepo: LoadAccountByEmailRepository & UpdateAccessTokenRepository & CreateUser,
  tokenGenerator: TokenGenerator,
  hasher: HashComparer & Hasher
) => UserSignUp
type Input = { name: string, email: string, password: string }
type Output = { accessToken: string, email: string } | ExistingAccount | NotCreatedUser
export type UserSignUp = (input: Input) => Promise<Output>

export const setupUserSignUp: Setup = (userAccountRepo, tokenGenerator, hasher) => async (input) => {
  const account = await userAccountRepo.loadByEmail({ email: input.email })
  if (account != null) {
    return new ExistingAccount()
  }
  const { encrypted } = await hasher.hash({ plaintext: input.password })
  const newAccount = await userAccountRepo.create({ email: input.email, password: encrypted })
  if (newAccount != null) {
    const accessToken = await tokenGenerator.generate({ key: newAccount.id.toString(), ...AccessToken })
    await userAccountRepo.updateAccessToken({ id: newAccount.id, token: accessToken })
    return new User({
      accessToken,
      email: newAccount.email
    })
  }
  return new NotCreatedUser()
}
