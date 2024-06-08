import { AuthLayout } from '~/components/auth/auth_layout'
import { FormEvent, useState } from 'react'
import { router } from '@inertiajs/react'
import { tuyau } from '~/core/tuyau'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = new FormData(event.target as HTMLFormElement)

    router.post(tuyau.$url('auth.login'), form, { onFinish: () => setIsLoading(false) })
  }
  return (
    <AuthLayout title="Sign in to your account">
      <form action="" method="POST" onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
      </form>
    </AuthLayout>
  )
}
