import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import LikeEntity from '../like/LikeEntity'

@Entity('videos')
export default class VideoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ name: 'channel_id' })
    channelId: string

    @Column()
    title: string

    @Column()
    description: string

    @Column({ name: 'preview_url' })
    previewUrl: string

    @Column({ name: 'file_url' })
    fileUrl: string

    @Column()
    duration: string

    @Column({ name: 'published_at', type: 'date' })
    publishedAt: Date

    @OneToMany(() => LikeEntity, like => like.video)
    likes: LikeEntity[]
}
