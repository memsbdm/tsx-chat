import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PublicChatController = () => import('#chat/controllers/public_chat_controller')
const PrivateChatController = () => import('#chat/controllers/private_chat_controller')
const RegisterController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')

// Auth

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController, 'execute'])
    router.get('register', [RegisterController, 'render']).as('auth.register')
    router.post('register', [RegisterController, 'execute'])
  })
  .prefix('auth')
  .middleware(middleware.guest())

router
  .group(() => {
    router.get('/', ({ inertia }) => {
      return inertia.render('home', { version: 6 })
    })

    router
      .group(() => {
        router.get('private', [PrivateChatController, 'render']).as('chat.private')
        router.post('private', [PrivateChatController, 'execute'])
        router.get('private/join', [PrivateChatController, 'join']).as('chat.private.join')
        router.get('private/leave', [PrivateChatController, 'leave']).as('chat.private.leave')

        router.get('public', [PublicChatController, 'render']).as('chat.public')
        router.post('public', [PublicChatController, 'execute'])
        router.get('public/join', [PublicChatController, 'join']).as('chat.public.join')
        router.get('public/leave', [PublicChatController, 'leave']).as('chat.public.leave')
      })
      .prefix('chat')
  })
  .middleware(middleware.auth())
