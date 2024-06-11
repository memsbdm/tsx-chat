import { Head, Link } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div className={'h-screen flex flex-col justify-center items-center'}>
        <h1>AdonisJS {props.version} x Inertia x React</h1>
        <div className={'flex gap-xl mt5'}>
          <Link href={'/chat/private'} className={'underline'}>
            Join private chat
          </Link>
          <Link href={'/chat/private'} className={'underline'}>
            Join public chat
          </Link>
        </div>
      </div>
    </>
  )
}
