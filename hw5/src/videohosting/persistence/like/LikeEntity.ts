import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import UserEntity from '../user/UserEntity'
import VideoEntity from '../video/VideoEntity'

@Entity('likes')
export default class LikeEntity extends BaseEntity {
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity, { primary: true })
    user: UserEntity

    @Column({ name: 'video_id', type: 'string', primary: true })
    videoId: string

    @Column({ name: 'positive', type: 'boolean' })
    positive: boolean

    @Column({ name: 'created_at' })
    createdAt: Date

    @JoinColumn({ name: 'video_id' })
    @ManyToOne(() => VideoEntity, video => video.likes)
    video: VideoEntity
}
