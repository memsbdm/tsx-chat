import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import transmit from '@adonisjs/transmit/services/main'
import vine from '@vinejs/vine'

export default class PrivateChatController {
  static validator = vine.compile(vine.object({ message: vine.string() }))

  render({ inertia }: HttpContext) {
    return inertia.render('chat/private_chat')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { message } = await request.validateUsing(PrivateChatController.validator)
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')
    transmit.broadcast('chat/private', { username, message, date })

    return response.redirect().back()
  }
}
