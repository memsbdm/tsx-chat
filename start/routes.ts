import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LoginController = () => import('#auth/controllers/login_controller')

// Auth

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController, 'execute'])
  })
  .prefix('auth')
  .middleware(middleware.guest())
