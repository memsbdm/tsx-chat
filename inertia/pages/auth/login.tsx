import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/tuyau'
import type { FormEvent } from 'react'
import { AuthLayout } from '~/components/auth/auth_layout'

export default function LoginPage() {
  const { errors, post, processing, data, setData, reset } = useForm({ username: '', password: '' })

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('auth.login'), {
      onFinish() {
        reset('password')
      },
    })
  }

  return (
    <AuthLayout title="Sign in to your account">
      {'code' in errors && errors.code === 'E_INVALID_CREDENTIALS' && (
        <span>No account found with the provided credentials</span>
      )}

      <form action="" method="POST" onSubmit={submit}>
        <div>
          <label htmlFor="email">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <button type="submit" disabled={processing}>
          {processing ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p>
        Not a member yet? <Link href={tuyau.$url('auth.register')}>Register</Link>
      </p>
    </AuthLayout>
  )
}
