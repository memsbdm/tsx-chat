import { Link, useForm } from '@inertiajs/react'
import { tuyau } from '~/core/tuyau'
import type { FormEvent } from 'react'
import { AuthLayout } from '~/components/auth/auth_layout'
import { Submit } from '~/components/form/submit'
import { FormError } from '~/components/form/form_error'

export default function RegisterPage() {
  const { errors, post, processing, data, setData, reset } = useForm({
    username: '',
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
    <AuthLayout title="Register a new account">
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

        <div className={'flex flex-col'}>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={data.passwordConfirmation}
            onChange={(e) => setData('passwordConfirmation', e.target.value)}
          />
        </div>

        <Submit label="Register" disabled={processing}></Submit>
      </form>
      <p>
        Already have an account?{' '}
        <Link href={tuyau.$url('auth.login')} className={'text-blue-5'}>
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
