export class ExistingAccount extends Error {
  constructor () {
    super('Existing account')
    this.name = 'CreateUserError'
  }
}
