import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { User } from '#auth/models/user'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      email: vine
        .string()
        .email()
        .unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
      password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterController.validator)
    const user = await User.create(payload)

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}