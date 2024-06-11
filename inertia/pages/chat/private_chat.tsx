import { Submit } from '~/components/form/submit'
import { useForm } from '@inertiajs/react'
import { FormEvent, useEffect } from 'react'
import { Transmit } from '@adonisjs/transmit-client'
import { tuyau } from '~/core/tuyau'
import { DateTime } from 'luxon'

interface SentMessage {
  date: DateTime
  message: string
  username: string
}

export default function PrivateChat() {
  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: window.location.origin,
    })
    const subscription = transmit.subscription('chat/private')
    ;(async () => {
      await subscription.create()
    })()

    subscription.onMessage((data: SentMessage) => {
      const newChatsContainer = document.querySelector('.new_chats_container')!
      const newChat = document.createElement('p')
      const { date, message, username } = data
      newChat.innerText = date + ' - ' + username + ' : ' + message
      newChatsContainer.appendChild(newChat)
      console.log(data)
    })
  }, [])
  const { setData, post, processing, data, reset } = useForm({ message: '' })

  function submit(event: FormEvent) {
    event.preventDefault()
    if (processing) {
      return
    }
    post(tuyau.$url('chat.private'), {
      onFinish() {
        reset('message')
      },
    })
  }
  return (
    <>
      <div className={'h-screen flex flex-col justify-between items-center w-full px5'}>
        <div
          className={'new_chats_container h-full w-full my-6 flex flex-col justify-end  md:w-2xl'}
        ></div>
        <form
          action=""
          id="message_form"
          className="flex flex-col w-full  md:w-2xl"
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
          <Submit label={'Send'} disabled={false}></Submit>
        </form>
      </div>
    </>
  )
}
