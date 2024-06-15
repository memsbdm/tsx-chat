import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'
import { User, type UserId } from '#auth/models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export type ChatId = Opaque<'ChatId', string>

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  declare id: ChatId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare message: string

  @column()
  declare userId: UserId

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
