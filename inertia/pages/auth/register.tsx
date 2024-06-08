import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/tuyau'
import type { FormEvent } from 'react'
import { AuthLayout } from '~/components/auth/auth_layout'

export default function RegisterPage() {
  const { errors, post, processing, data, setData, reset } = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('auth.register'), {
      onFinish() {
        reset('password', 'passwordConfirmation')
      },
    })
  }

  return (
    <AuthLayout title="Register">
      <form action="" method="POST" onSubmit={submit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
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

        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={data.passwordConfirmation}
            onChange={(e) => setData('passwordConfirmation', e.target.value)}
          />
        </div>

        <button type="submit" disabled={processing}>
          {processing ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <Link href={tuyau.$url('auth.login')}>Login</Link>
      </p>
    </AuthLayout>
  )
}
