import { Connection, getConnection, getRepository } from 'typeorm'
import Channel from './model/channel.entity'
import Like from './model/like.entity'
import Subscription from './model/subscription.entity'
import HostingUser from './model/user/User.entity'
import Video from './model/video.entity'

export default class VideoHostingRepository {
    private _connection: Connection

    public async getUsersWithChannels() {
        const result = await getRepository(Channel).createQueryBuilder('channel')
            .select(['users.id', 'users.avatarUrl', 'users.name', 'channel.description', 'channel.photoUrl', 'channel.createdAt'])
            .leftJoin('channel.user', 'users')
            .orderBy('channel.created_at', 'DESC').getMany()
        return result
    }

    public async getMostLikedVideos() {
        const subQuery = await getRepository(Like).createQueryBuilder('like')
            .select('like.videoId')
            .where('like.positive = true')
            .groupBy('like.videoId')
            .orderBy('count(*)', 'DESC')
            .limit(5)
            .getQuery()
        const result = await getRepository(Video).createQueryBuilder('video')
            .where(`video.id in (${subQuery})`)
        return result.getMany()
    }

    public async getVideosFromUserSubscriptions(name: string) {
        const user = await getRepository(HostingUser).findOne({ where: { name: name } })
        if (user) {
            const subscriptionsSubquery = await getRepository(Subscription).createQueryBuilder('subscription')
                .select('subscription.channel')
                .where(`subscription.user = '${user.id}'`)
                .getQuery()

            const mainQuery = await getRepository(Video).createQueryBuilder('video')
                .select(['video.id', 'video.title', 'video.previewUrl', 'video.duration', 'video.publishedAt'])
                .where(`video.channelId in (${subscriptionsSubquery})`)
                .orderBy('video.publishedAt', 'DESC')

            return mainQuery.getMany()
        }
        return []
    }

    public async getChannelInfo(channelId: string) {
        const result = await getRepository(Channel).createQueryBuilder('channel')
            .loadRelationCountAndMap('channel.subscriptions', 'channel.subscriptions')
            .where('channel.id = :id', { id: channelId })
            .getOne()
        return result
    }

    public async getMostPopularVideos() {
        const runner = await this.getQueryRunner()
        return runner.query('SELECT likes.video_id, videos.channel_id, videos.title, videos.description, videos.preview_url, videos.file_url, videos.duration, videos.published_at ' +
            'FROM likes ' +
            'RIGHT JOIN videos ' +
            'ON likes.video_id = videos.id ' +
            'WHERE videos.published_at >= \'20210901\' ' +
            'GROUP BY likes.video_id, videos.channel_id, videos.title, videos.description, videos.preview_url, videos.file_url, videos.duration, videos.published_at ' +
            'HAVING COUNT(CASE WHEN likes.positive = \'true\' THEN 1 ELSE null END) >= 4 ' +
            'ORDER BY COUNT(CASE WHEN likes.positive = \'true\' THEN 1 ELSE null END) DESC LIMIT 10')
    }

    public async getUserSubscriptions(name: string) {
        const runner = await this.getQueryRunner()
        return runner.query('SELECT subscriptions.id, subscriptions.level, subscriptions.subscribed_at FROM users ' +
            `RIGHT JOIN subscriptions on users.id = subscriptions.user_id WHERE NAME = '${name}' ` +
            'ORDER BY (' +
            'CASE subscriptions.level ' +
            'WHEN \'vip\' THEN 0 ' +
            'WHEN \'follower\' THEN 1 ' +
            'WHEN \'fan\' THEN 2 ' +
            'WHEN \'standard\' THEN 3 ' +
            'END ' +
            '), subscriptions.subscribed_at DESC ')
    }

    private async getConnection() {
        if (!this._connection) {
            this._connection = await getConnection()
        }
        return this._connection
    }

    private async getQueryRunner() {
        const conn = await this.getConnection()
        const runner = conn.createQueryRunner()
        return runner
    }
}
