import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import transmit from '@adonisjs/transmit/services/main'
import { ChatValidator } from '../validators/chat_validator.js'

export default class PrivateChatController {
  render({ inertia }: HttpContext) {
    return inertia.render('chat/private_chat')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { message } = await request.validateUsing(ChatValidator)
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')

    transmit.broadcast('chat/private', { username, message, date })

    return response.redirect().back()
  }

  join({ auth, response }: HttpContext) {
    const message = 'joined the chat.'
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')

    transmit.broadcast('chat/private', { username, message, date })

    return response.redirect().back()
  }

  leave({ auth, response }: HttpContext) {
    const message = 'left the chat.'
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')

    transmit.broadcast('chat/private', { username, message, date })

    return response.redirect().back()
  }
}
