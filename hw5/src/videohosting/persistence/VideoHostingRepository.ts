import { getRepository } from 'typeorm'
import ChannelEntity from './channel/ChannelEntity'
import LikeEntity from './like/LikeEntity'
import SubscriptionEntity from './subscription/SubscriptionEntity'
import SubscriptionMapper from './subscription/SubscriptionMapper'
import UserSubscriptionRaw from './subscription/UserSubscriptionRaw'
import UserEntity from './user/UserEntity'
import UserMapper from './user/UserMapper'
import PopularVideoRaw from './video/PopularVideoRaw'
import VideoEntity from './video/VideoEntity'
import VideoMapper from './video/VideoMapper'

export default class VideoHostingRepository {
    public async getUsersWithChannels() {
        const result = await getRepository(ChannelEntity).createQueryBuilder('channel')
            .select(['users.id', 'users.avatarUrl', 'users.name', 'channel.description', 'channel.photoUrl', 'channel.createdAt'])
            .leftJoin('channel.user', 'users')
            .orderBy('channel.created_at', 'DESC').getMany()

        const mappedResult = result.map(value => UserMapper.toUserWithChannelDto(value))
        return mappedResult
    }

    public async getMostLikedVideos() {
        const subQuery = await getRepository(LikeEntity).createQueryBuilder('like')
            .select('like.videoId')
            .where('like.positive = true')
            .groupBy('like.videoId')
            .orderBy('count(*)', 'DESC')
            .limit(5)
            .getQuery()
        const result = await getRepository(VideoEntity).createQueryBuilder('video')
            .where(`video.id in (${subQuery})`)
            .getMany()

        const mappedResult = result.map(value => VideoMapper.toTopDto(value))
        return mappedResult
    }

    public async getVideosFromUserSubscriptions(name: string) {
        const user = await getRepository(UserEntity).findOne({ where: { name: name } })
        if (user) {
            const subscriptionsSubqueryResult = await getRepository(SubscriptionEntity).createQueryBuilder('subscription')
                .select('subscription.channelId')
                .where(`subscription.user = '${user.id}'`)
                .getMany()

            const arrayOfIds = subscriptionsSubqueryResult.map(entity => { return entity.channelId })
            const mainQueryResult = await getRepository(VideoEntity).createQueryBuilder('video')
                .select(['video.id', 'video.title', 'video.previewUrl', 'video.duration', 'video.publishedAt'])
                .where('video.channelId in (:...array)', { array: arrayOfIds })
                .orderBy('video.publishedAt', 'DESC').getMany()

            const mappedResult = mainQueryResult.map(value => VideoMapper.tovideoFromUserSubscriptionDto(value))
            return mappedResult
        }
        return []
    }

    public async getChannelInfo(channelId: string) {
        const result = await getRepository(ChannelEntity).createQueryBuilder('channel')
            .loadRelationCountAndMap('channel.subscriptions', 'channel.subscriptions')
            .where('channel.id = :id', { id: channelId })
            .getOne()
        return result
    }

    public async getMostPopularVideos() {
        const result = await getRepository(LikeEntity).createQueryBuilder('like')
            .select('sum(case when like.positive = true then 1 else 0 end)', 'like_counter')
            .addSelect('COUNT(*)', 'reactions')
            .innerJoinAndSelect('like.video', 'video')
            .where('video.published_at >= \'20210901\'')
            .having('sum(case when like.positive = true then 1 else 0 end) > 4')
            .groupBy('like.video_id')
            .addGroupBy('video.id')
            .orderBy('like_counter', 'DESC')
            .limit(10)
            .getRawMany()

        const mappedResult = result.map((value: PopularVideoRaw) => VideoMapper.toPopularDto(value))
        return mappedResult
    }

    public async getUserSubscriptions(name: string) {
        const result = await getRepository(SubscriptionEntity).createQueryBuilder('sub')
            .select(['user.name', 'user.avatar_url', 'channel.photo_url', 'channel.description',
                'sub.level', 'sub.subscribed_at'])
            .innerJoin('sub.user', 'user', 'user.name = :name', { name: name })
            .innerJoin('sub.channel', 'channel')
            .orderBy('CASE sub.level ' +
                'WHEN \'vip\' THEN 0 ' +
                'WHEN \'follower\' THEN 1 ' +
                'WHEN \'fan\' THEN 2 ' +
                'WHEN \'standard\' THEN 3 ' +
                'END')
            .addOrderBy('sub.subscribed_at', 'DESC')
            .getRawMany()

        const mappedResult = result.map((value: UserSubscriptionRaw) => SubscriptionMapper.toDto(value))
        return mappedResult
    }
}
