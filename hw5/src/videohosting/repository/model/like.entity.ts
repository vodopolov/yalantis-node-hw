import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import HostingUser from './user/User.entity'
import Video from './video.entity'

@Entity('likes')
export default class Like extends BaseEntity {
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => HostingUser, { primary: true })
    user: HostingUser

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(() => Video, { primary: true })
    videoId: Video

    @Column({ name: 'positive', type: 'boolean' })
    positive: boolean

    @Column({ name: 'created_at' })
    createdAt: Date
}
