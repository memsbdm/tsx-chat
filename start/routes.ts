/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LoginController = () => import('#auth/controllers/login_controller')

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController, 'execute'])
  })
  .prefix('auth')
