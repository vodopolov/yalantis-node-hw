import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import SubscriptionEntity from '../subscription/SubscriptionEntity'
import UserEntity from '../user/UserEntity'

@Entity('channels')
export default class ChannelEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ name: 'user_id' })
    userId: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'photo_url' })
    photoUrl: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @OneToMany(() => SubscriptionEntity, subscription => subscription.channel)
    subscriptions: SubscriptionEntity[]

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity)
    user: UserEntity
}
