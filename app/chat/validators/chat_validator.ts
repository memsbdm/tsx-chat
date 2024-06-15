import vine from '@vinejs/vine'

export const ChatValidator = vine.compile(vine.object({ message: vine.string() }))
