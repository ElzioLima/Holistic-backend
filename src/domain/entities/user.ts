type UserData = { email: string, accessToken: string }

export class User {
  email: string
  accessToken: string

  constructor (movieData: UserData) {
    this.email = movieData.email
    this.accessToken = movieData.accessToken
  }
}
