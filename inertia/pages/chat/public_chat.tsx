import { Submit } from '~/components/form/submit'
import { router, useForm } from '@inertiajs/react'
import { FormEvent, useEffect } from 'react'
import { Transmit } from '@adonisjs/transmit-client'
import { tuyau } from '~/core/tuyau'
import { DateTime } from 'luxon'
import { FormError } from '~/components/form/form_error'

export default function PublicChat() {
  interface SentMessage {
    date: DateTime
    message: string
    username: string
  }

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: window.location.origin,
    })
    const subscription = transmit.subscription('chat/public')
    ;(async () => {
      await subscription.create()
      await fetch(tuyau.$url('chat.public.join'))
    })()

    const stopListening = subscription.onMessage((data: SentMessage) => {
      const newChatsContainer = document.querySelector('.new_chats_container')!
      const newChat = document.createElement('p')
      const { date, message, username } = data
      newChat.innerText = date + ' - ' + username + ' : ' + message
      newChatsContainer.appendChild(newChat)
    })

    return () => {
      router.get(tuyau.$url('chat.public.leave'))
      stopListening()
    }
  }, [])
  const { errors, setData, post, processing, data, reset } = useForm({ message: '' })

  function submit(event: FormEvent) {
    event.preventDefault()
    if (processing) {
      return
    }
    post(tuyau.$url('chat.public'), {
      onFinish() {
        reset('message')
      },
    })
  }
  return (
    <>
      <div className={'h-screen flex flex-col justify-between items-center w-full px5'}>
        <div
          className={'new_chats_container h-full w-full my-6 flex flex-col justify-end md:w-2xl'}
        ></div>
        <form
          action=""
          id="message_form"
          className="flex flex-col w-full md:w-2xl"
          onSubmit={submit}
          method="POST"
        >
          <input
            id="message"
            className="bg-gray-100 border border-gray-300 rounded "
            name="message"
            type="text"
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
          />
          {'code' in errors && errors.code === 'E_TOO_MANY_REQUESTS' && (
            <FormError label={"You're too fast!"} />
          )}
          <Submit label={'Send'} disabled={processing}></Submit>
        </form>
      </div>
    </>
  )
}
