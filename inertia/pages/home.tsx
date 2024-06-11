import { Head, Link } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div className={'h-screen flex flex-col justify-center items-center'}>
        <h1>AdonisJS {props.version} x Inertia x React</h1>
        <p className={'mt5'}>Messages on private chat are not saved in db there is no history.</p>
        <p>Messages on public chat are saved in db.</p>
        <div className={'flex gap-xl mt5 underline'}>
          <Link href={'/chat/private'}>Join private chat</Link>
          <Link href={'/chat/public'}>Join public chat</Link>
        </div>
      </div>
    </>
  )
}
