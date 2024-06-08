import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/tuyau'
import type { FormEvent } from 'react'
import { AuthLayout } from '~/components/auth/auth_layout'
import { Submit } from '~/components/form/submit'
import { FormError } from '~/components/form/form_error'

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
        <FormError label={'No account found with provided credentials'} />
      )}

      <form action="" method="POST" onSubmit={submit} className="w-80">
        <div className={'flex flex-col'}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          {errors.username && <FormError label={errors.username} />}
        </div>

        <div className={'flex flex-col'}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <FormError label={errors.password} />}
        </div>
        <Submit label="Login" disabled={processing}></Submit>
      </form>
      <p>
        Not a member yet?{' '}
        <Link href={tuyau.$url('auth.register')} className={'text-blue-5'}>
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}
