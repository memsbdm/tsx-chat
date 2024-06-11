import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PrivateChatController = () => import('../app/chat/controllers/private_chat_controller.js')
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
      })
      .prefix('chat')
  })
  .middleware(middleware.auth())
