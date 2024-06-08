import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { User } from '#auth/models/user'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      username: vine.string(),
      password: vine.string(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { username, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
