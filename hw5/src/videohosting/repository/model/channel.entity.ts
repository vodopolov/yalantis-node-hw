import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Subscription from './subscription.entity'
import HostingUser from './user/User.entity'

@Entity('channels')
export default class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => HostingUser)
    user: HostingUser

    @Column()
    description: string

    @Column({ name: 'photo_url' })
    photoUrl: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @OneToMany(() => Subscription, subscription => subscription.channel)
    subscriptions: Subscription[]
}
