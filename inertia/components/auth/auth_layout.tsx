import { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { title, children } = props

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
