import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import transmit from '@adonisjs/transmit/services/main'
import { ChatValidator } from '#chat/validators/chat_validator'
import Chat from '#chat/models/chat'

export default class PublicChatController {
  render({ inertia }: HttpContext) {
    return inertia.render('chat/public_chat')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { message } = await request.validateUsing(ChatValidator)
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')

    transmit.broadcast('chat/public', { username, message, date })
    await Chat.create({ userId: auth.user!.id, message: message })

    return response.redirect().back()
  }

  join({ auth, response }: HttpContext) {
    const message = 'joined the chat.'
    const username = auth.user!.username
    const date = DateTime.now().toFormat('DD H:mm:ss')

    transmit.broadcast('chat/public', { username, message, date })

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
