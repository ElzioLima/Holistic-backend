import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { UserSignUp } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string }
type Model = Error | { accessToken: string }

export class UserSignUpController extends Controller {
  constructor (private readonly userSignUp: UserSignUp) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.userSignUp({ name, email, password })
      return ok(accessToken)
    } catch (error) {
      throw error
    }
  }

  override buildValidators ({ name, email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' })
        .required()
        .build(),
      ...Builder.of({ value: email, fieldName: 'email' })
        .required()
        .build(),
      ...Builder.of({ value: password, fieldName: 'password' })
        .required()
        .build()
    ]
  }
}
