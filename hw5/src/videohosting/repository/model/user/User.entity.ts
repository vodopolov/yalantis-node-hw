import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export default class HostingUser extends BaseEntity {
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
}
