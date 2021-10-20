import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ChannelEntity from '../channel/ChannelEntity'
import UserEntity from '../user/UserEntity'

@Entity('subscriptions')
export default class SubscriptionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ name: 'channel_id' })
    channelId: string

    @Column({ name: 'user_id' })
    userId: string

    @Column({ name: 'level' })
    level: string

    @Column({ name: 'subscribed_at' })
    subscribedAt: Date

    @JoinColumn({ name: 'channel_id' })
    @ManyToOne(() => ChannelEntity, channel => channel.subscriptions)
    channel: ChannelEntity

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity, user => user.subscriptions)
    user: UserEntity
}
