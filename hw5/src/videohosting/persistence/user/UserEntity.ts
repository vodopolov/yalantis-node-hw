import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import SubscriptionEntity from '../subscription/SubscriptionEntity'

@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    gender: string

    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl?: string

    @OneToMany(() => SubscriptionEntity, subscription => subscription.user)
    subscriptions: SubscriptionEntity[]
}
