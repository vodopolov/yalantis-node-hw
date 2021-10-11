import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('videos')
export default class Video extends BaseEntity {
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
}
