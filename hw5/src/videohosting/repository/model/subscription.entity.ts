import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Channel from './channel.entity'

@Entity('subscriptions')
export default class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @JoinColumn({ name: 'channel_id' })
    @ManyToOne(() => Channel, channel => channel.subscriptions)
    channel: Channel

    @Column({ name: 'user_id' })
    user: string

    @Column({ name: 'level' })
    level: string

    @Column({ name: 'subscribed_at' })
    subscribedAt: Date
}
